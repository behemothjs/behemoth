/**
 * @env AWS_REGION
 * @typedef {import('../types.js').GetCommandOutput} GetCommandOutput
 * @typedef {import('../types.js').PutCommandOutput} PutCommandOutput
 * @typedef {import('../types.js').UpdateCommandOutput} UpdateCommandOutput
 * @typedef {import('../types.js').DeleteCommandOutput} DeleteCommandOutput
 */

import process from 'node:process';
import _ from 'lodash';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand} from '@aws-sdk/lib-dynamodb';
import {unmarshall} from '@aws-sdk/util-dynamodb';
import {v4 as uuidv4} from 'uuid';
import {QueryBuilder} from '../query-builder/index.js';

const {
	ENV = 'main',
	REGION = 'ap-northeast-1',
} = process.env;

const marshallOptions = {
	convertEmptyValues: true, // false, by default.
	removeUndefinedValues: true, // false, by default.
	convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
	wrapNumbers: false, // false, by default.
};
const translateConfig = {marshallOptions, unmarshallOptions};
const dynamoClient = new DynamoDBClient({region: REGION});
const documentClient = DynamoDBDocumentClient.from(dynamoClient, translateConfig);

/**
 * DB
 * @example
 * import {DB} from '@psinc/aws-dynamo';
 *
 * const db = new DB();
 *
 * const item = awai db
 *  .table('users')
 *  .get({id: 1});
 *
 * const items = await db
 * .table('users')
 * .scan();
 *
 * await db
 * .table('users')
 * .put({id: 1, name: 'test'});
 *
 * await db
 * .table('users')
 * .update({id: 1}, {name: 'test'});
 *
 * await db
 * .table('users')
 * .delete({id: 1});
 *
 * await db
 * .table('users')
 * .query()
 * .where('id', 1)
 * .whereBetween('createdAt', '2023-01-01', '2023-01-03') // key, from, to
 * .get(); // get() / first() / chunk() / each()
 *
 * await db
 * .table('users')
 * .chunk(1000, async items => {
 *  // 1000件のアイテムを処理する
 *  // return false で停止
 * });
 *
 * await db
 * .table('users')
 * .each(async item => {
 *  // 1件ずつアイテムを処理する
 *  // return false で停止
 * })
 */
export class DB {
	/** @type {string} */
	_tableName;

	/** @type {string} */
	_region = 'ap-northeast-1';

	/** @type {DynamoDBDocumentClient} */
	_client;

	/** @type {import('../model/index.js').Model} */
	ModelClass;

	/**
	 * @param {string} tableName
	 * @param {string?} region - default: REGION || 'ap-northeast-1'
	 * @param {import('../model/index.js').Model?} ModelClass
	 */
	constructor(tableName, region = undefined, ModelClass = undefined) {
		documentClient.config.region = region ?? REGION;
		this._client = documentClient;
		this.table(tableName).region(region);
		this.ModelClass = ModelClass;
	}

	static unmarshall = unmarshall;

	/**
	 * @deprecated
	 * unmarshallへ移行してください。
	 */
	static unmarshalItem(item) {
		return unmarshall(item);
	}

	static uuid() {
		return uuidv4();
	}

	get config() {
		return {
			region: this._region,
			tableName: this._tableName,
			client: this._client,
		};
	}

	table(tableName) {
		this._tableName = tableName;
		return this;
	}

	region(region) {
		if (region) {
			this._region = region;
			documentClient.config.region = this._region;
			this._client = documentClient;
		}

		return this;
	}

	async send(command) {
		const response = await this._client.send(command);
		const {ModelClass} = this;
		const {Item, Items} = response;
		if (ModelClass && Item) {
			response.Item = new ModelClass(Item);
		}

		if (ModelClass && Items) {
			response.Items = Items.map(item => new ModelClass(item));
		}

		return response;
	}

	/**
	 * テーブル内のアイテムをスキャンします。
	 * @param {number} limit - default: 1000
	 * @param {Record<string, unknown>} nextKey
	 */
	scan(limit = 1000, nextKey = undefined) {
		return this.send(
			new ScanCommand({
				TableName: this._tableName,
				Limit: limit,
				ExclusiveStartKey: nextKey,
			}),
		);
	}

	/**
	 * テーブル内のアイテムをスキャンし、コールバック関数に渡します。
	 * @param {number} size
	 * @param {() => boolean} callback
	 * @param {Record<string, unknown>} nextKey 続きから取得する場合に指定します。
	 * @param {import('../model/index.js').Model} ModelClass
	 * @example
	 * // 1000件ずつスキャンし、コールバック関数に渡す
	 * await db.chunk(1000, async items => {
	 *   // 1000件のアイテムを処理する
	 *   await Promise.all(
	 *     items.map(async item => {
	 *       // アイテムを処理する
	 *     })
	 *   );
	 *   return false; // falseを返すと処理を中断する
	 * });
	 */
	async chunk(size, callback, nextKey = undefined, ModelClass = undefined) {
		ModelClass = this.ModelClass ?? ModelClass;
		const continuousScan = async (_nextKey = undefined) => {
			const {Items, LastEvaluatedKey} = await this.scan(size, _nextKey);
			const continuable = await callback(ModelClass ? Items.map(item => new ModelClass(item)) : Items, LastEvaluatedKey);
			if (continuable === false) {
				return;
			}

			if (LastEvaluatedKey) {
				await continuousScan(LastEvaluatedKey);
			}
		};

		await continuousScan(nextKey);
	}

	/**
	 * 単一アイテムを取得します。
	 * @param {Record<string, unknown>} Key
	 * @param {string} IndexName
	 * @returns {Promise<GetCommandOutput>} GetCommandOutput
	 * @example
	 * // idが1のアイテムを取得する
	 * await db.get({id: 1});
	 * // idが1のアイテムを取得する（インデックス名指定）
	 * await db.get({id: 1}, 'id-index');
	 */
	get(Key = {}, IndexName = undefined) {
		return this.send(
			new GetCommand({
				TableName: this._tableName,
				IndexName,
				Key,
			}),
		);
	}

	/**
   * 単一アイテムを作成または更新します。（部分更新不可）
   * @param {Record<string, unknown>} item
   * @returns {Promise<PutCommandOutput>}
   */
	put(item) {
		return this.send(
			new PutCommand({
				TableName: this._tableName,
				Item: item,
			}),
		);
	}

	/**
   * 単一アイテムを新規作成します。重複するIDがある場合はエラーになります。
   * @param {Record<string, unknown>} item
   * @returns {Promise<PutCommandOutput>}
   */
	create(primaryKey, item) {
		return this.send(
			new PutCommand({
				TableName: this._tableName,
				Item: item,
				ConditionExpression: 'attribute_not_exists(#primaryKey)',
				ExpressionAttributeNames: {
					'#primaryKey': primaryKey,
				},
			}),
		);
	}

	/**
   * ## 単一アイテムを部分更新します。
	 * ### ＊存在しないアイテムを更新するとエラーになります。
   * @param {Record<string, unknown>} Key
   * @param {Record<string, unknown>} item
   * @returns {Promise<UpdateCommandOutput>}
   * @example
   * // idが1のアイテムのnameを更新する
   * await db.update({id: 1}, {name: 'updated'});
   */
	async update(Key = {}, item = {}) {
		// 未完成スキーマアイテムの生成を避けるため存在確認します。
		// -> DynamoDBはUpdate時にアイテムが存在しない場合でも新規作成してしまう。
		const {Item} = await this.get(Key);
		if (!Item) {
			const error = new Error('アイテムが存在しません。');
			error.name = 'NotFoundError';
			error.code = 404;
			throw error;
		}

		const expressionAttributes = Object.keys(item)
			.filter(key => item[key] !== undefined)
			.map((key, index) => ({
				expKey: `#key${index}`,
				expValue: `:value${index}`,
				key,
				value: item[key],
			}));
		const UpdateExpression = 'set ' + expressionAttributes
			.map(({expKey, expValue}) => `${expKey} = ${expValue}`)
			.join(', ');
		const ExpressionAttributeNames = _(expressionAttributes)
			.map(({expKey, key}) => [expKey, key])
			.fromPairs()
			.value();
		const ExpressionAttributeValues = _(expressionAttributes)
			.map(({expValue, value}) => [expValue, value])
			.fromPairs()
			.value();
		return this.send(
			new UpdateCommand({
				TableName: this._tableName,
				Key,
				UpdateExpression,
				ExpressionAttributeNames,
				ExpressionAttributeValues,
			}),
		);
	}

	/**
   * 単一アイテムを削除します。
   * @param {Record<string, unknown>} Key
   * @returns {Promise<DeleteCommandOutput>}
   * @example
   * // idが1のアイテムを削除する
   * await db.delete({id: 1});
   */
	delete(Key = {}) {
		return this.send(
			new DeleteCommand({
				TableName: this._tableName,
				Key,
			}),
		);
	}

	/****************************************
	 * Query
	 * --------------------------------------
	 * QueryBuilderを使用してクエリを作成します。
	 * @param {string} indexName（任意）インデックス名
   * @returns {QueryBuilder}
	 * @description
	 * 横着してすまん。
	 * 一回query()呼んでからwhere()して下さい。
	 */

	query(indexName = undefined) {
		const queryBuilder = new QueryBuilder(this);
		if (indexName) {
			return queryBuilder.index(indexName);
		}

		return queryBuilder;
	}
}
