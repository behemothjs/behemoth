/* eslint-disable unicorn/prevent-abbreviations */

import _ from 'lodash';
import {ScanCommand, QueryCommand} from '@aws-sdk/lib-dynamodb';

export class QueryBuilder {
	// Config
	_db;
	// Settings
	_indexName;
	_limit;
	_nextKey;
	// Order
	_isASC = true;
	// Where
	_expressions = [];

	/**
	 * @param {} db
	 */
	constructor(db) {
		this._db = db;
	}

	get config() {
		return {
			db: this._db,
			indexName: this._indexName,
			limit: this._limit,
			nextKey: this._nextKey,
			isASC: this._isASC,
			expressions: this._expressions,
		};
	}

	/**
   * 利用するインデックスを指定します。
   * @param {string} indexName
   * @returns {QueryBuilder}
   */
	index(indexName) {
		this._indexName = indexName;
		return this;
	}

	/**
   * アイテム返却数を指定します。
   *
   * @param {number} limit
   * @returns {QueryBuilder}
   */
	limit(limit = 1000) {
		this._limit = limit;
		return this;
	}

	nextKey(nextKey) {
		this._nextKey = nextKey;
		return this;
	}

	/**
   * 昇順か降順を指定します。
   * 指定しなければ降順になります。
   *
   * @param {'ASC|asc|DESC|desc'} AscOrDesc ASC（昇順）/DESC（降順）
   * @returns {QueryBuilder}
   */
	order(AscOrDesc = 'ASC') {
		AscOrDesc = String(AscOrDesc).toUpperCase();
		this._isASC = AscOrDesc === 'ASC';
		return this;
	}

	/**
   * 昇順で取り出します。
   * @returns {QueryBuilder}
   */
	desc() {
		this.order('DESC');
		return this;
	}

	/**
   * 昇順で取り出します。
   * @returns {QueryBuilder}
   */
	latest() {
		this.order('DESC');
		return this;
	}

	/**
   * @param {string} key
   * @param {'='|'>'|'>='|'<'|'<='|'beginsWith|BEGINS_WITH'} operator
   * @param {string|number} value
   * @returns {QueryBuilder}
   * @example
   * // idが1のアイテムを取得する
   * await db.where('id', 1).get();
   * // 第二引数に比較演算子を指定することもできる
   * await db.where('id', '>', 1).get();
   */
	where(...args) {
		let key;
		let operator = '=';
		let value;

		switch (args.length) {
			case 2: {
				[key, value] = args;
				break;
			}

			case 3: {
				[key, operator, value] = args;
				break;
			}

			default: {
				throw new Error(`Invalid arguments: ${args}`);
			}
		}

		switch (operator) {
			case '=':
			case '!=': // not equal
			case '>':
			case '>=':
			case '<':
			case '<=': {
				break;
			}

			case 'beginsWith':
			case 'BEGINS_WITH': {
				operator = 'BEGINS_WITH';
				break;
			}

			default: {
				throw new Error(`Invalid operator: ${operator}`);
			}
		}

		if (value === undefined) {
			throw new Error('[value] undefined.');
		}

		this._expressions.push({
			key,
			operator,
			value,
		});
		return this;
	}

	/**
	 * @deprecated 使えないようです。
   * @param {string} key
   * @param {string[]|number[]} values 最大 100 個の値を指定できます。
   * @returns {QueryBuilder}
   */
	whereIn(key, values) {
		if (!Array.isArray(values)) {
			throw new TypeError(`Invalid values: ${values}`);
		}

		if (values.length > 100) {
			throw new Error(`Too many values: ${values.length} > 100`);
		}

		this._expressions.push({
			key,
			operator: 'IN',
			value: values,
		});
		return this;
	}

	/**
   * キーの値がfrom以上、to以下のアイテムを取得します。
   * @param {string} key
   * @param {string|number[]} fromAndTo
   * @returns {QueryBuilder}
   */
	whereBetween(key, [from, to]) {
		this._expressions.push({
			key,
			operator: 'BETWEEN',
			value: `${from} AND ${to}`,
		});
		return this;
	}

	/**
   * キーの値が指定した文字列で始まるアイテムを取得します。
   * @param {string} key
   * @param {string} substring
   * @returns {QueryBuilder}
   */
	beginsWith(key, substring) {
		this._expressions.push({
			key,
			operator: 'BEGINS_WITH',
			value: substring,
		});
		return this;
	}

	/**
	 * 生成した条件でコマンドを作成します。
	 * @returns {ScanCommand|QueryCommand}
	 */
	toCommand() {
		if (this._expressions.length === 0) {
			return new ScanCommand({
				TableName: this._db.config.tableName,
				ExclusiveStartKey: this._nextKey,
				Limit: this._limit,
			});
		}

		const expressionAttributes = this._expressions
			.map(expression => ({
				...expression,
				expKey: `#${expression.key}`,
				expValue: `:${expression.key}`,
			}));
		const KeyConditionExpression = expressionAttributes
			.map(({expKey, operator, expValue, value}) => {
				switch (operator) {
					case 'BEGINS_WITH': {
						return `begins_with(${expKey}, ${expValue})`;
					}

					case 'BETWEEN': {
						return `${expKey} BETWEEN ${expValue}From AND ${expValue}To`;
					}

					case 'IN': {
						const expValues = value.map((_, index) => `${expValue}${index + 1}`).join(', ');
						return `${expKey} IN (${expValues})`;
					}

					default: {
						return `${expKey} ${operator} ${expValue}`;
					}
				}
			})
			.join(' AND ');
		const ExpressionAttributeNames = _(expressionAttributes)
			.map(({expKey, key}) => [expKey, key])
			.fromPairs()
			.value();
		const ExpressionAttributeValues = _(expressionAttributes)
			.flatMap(({operator, expValue, value}) => {
				switch (operator) {
					case 'BETWEEN': {
						const [from, to] = value.split(' AND ');
						return [
							[`${expValue}From`, from],
							[`${expValue}To`, to],
						];
					}

					case 'IN': {
						return value.map((value_, index) => [`${expValue}${index + 1}`, value_]);
					}

					default: {
						return [[expValue, value]];
					}
				}
			})
			.fromPairs()
			.value();
		return new QueryCommand({
			TableName: this._db.config.tableName,
			ExclusiveStartKey: this._nextKey,
			IndexName: this._indexName,
			KeyConditionExpression,
			ExpressionAttributeNames,
			ExpressionAttributeValues,
			Limit: this._limit,
			ScanIndexForward: this._isASC,
		});
	}

	/**
	 * 最大4MBまでのデータを取得します。
	 * @returns {Promise<*>}
	 */
	async get() {
		const response = await this._db.send(this.toCommand());
		return response;
	}

	/**
	 * 最初のアイテムを取得します。
	 * @returns {Promise<*>}
	 */
	async first() {
		const {Items} = await this.limit(1).get();
		return Items[0];
	}

	/**
	 * テーブル内のアイテムを検索した結果をコールバック関数に渡します。
	 * @param {number} size
	 * @param {Promise<boolean>} callback
	 * @returns {Promise<void>}
	 */
	async chunk(size = 1000, callback) {
		let limit = this._limit;
		let nextKey = true;
		while (nextKey) {
			if (limit && limit < size) {
				size = limit;
			}

			let command = this.limit(size);
			command = command.nextKey(nextKey && nextKey !== true ? nextKey : undefined);

			// eslint-disable-next-line no-await-in-loop
			const {Items, LastEvaluatedKey} = await command.get();
			nextKey = LastEvaluatedKey;
			if (limit) {
				limit -= Items.length;
				if (limit < 1) {
					nextKey = false;
				}
			}

			// eslint-disable-next-line no-await-in-loop
			const continuable = await callback(Items, LastEvaluatedKey);
			if (continuable === false) {
				nextKey = false;
			}
		}
	}

	/**
	 * テーブル内のアイテムを検索した結果を１件ずつコールバック関数に渡します。
	 * @param {Promise<boolean>} callback
	 * @param {number} chunkSize (Optional) 1回の取得で取得するアイテム数
	 * @returns {Promise<void>}
	 */
	async each(callback, chunkSize = 1000) {
		let limit = this._limit;
		let nextKey = true;
		while (nextKey) {
			let size = chunkSize;
			if (limit && limit < chunkSize) {
				size = limit;
			}

			let command = this.limit(size);
			command = command.nextKey(nextKey && nextKey !== true ? nextKey : undefined);

			// eslint-disable-next-line no-await-in-loop
			const {Items, LastEvaluatedKey} = await command.get();
			nextKey = LastEvaluatedKey;
			if (limit) {
				limit -= Items.length;
				if (limit < 1) {
					nextKey = false;
				}
			}

			while (Items.length > 0) {
				// eslint-disable-next-line no-await-in-loop
				const continuable = await callback(Items.shift());
				if (continuable === false) {
					nextKey = false;
					break;
				}
			}
		}
	}
}
