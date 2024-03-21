import {dateTime} from '@psinc/date-time';
import {DB} from '../db/index.js';

/**
 * Laravelのクエリビルダに操作感を似せています。難しい実装はせず、キー指定でデータ取得する簡単な設計にしてあります。
 *
 * @example
 * [static] query() -> QueryBuilder
 *
 * #### [static] query() -> QueryBuilder
 *
 * ```javascript
 * await Model
 *   .query()
 *   .where('name', 'yaki-onigiri')
 *   .whereIn('age', [1,2,3,4,5])
 *   .limit(3) // Limit
 *   .latest() // DESC
 *   .get(); // or .first() or .chunk()
 * ```
 *
 * #### [static] chunk(chukSize, callback)
 *
 * ```javascript
 * await Model.chunk(100, items => {});
 * ```
 *
 * #### [static] get(key)
 *
 * ```javascript
 * await Model.get({id: 'xxxx'});
 * ```
 *
 * #### [instance] reload()
 *
 * ```javascript
 * await model.reload();
 * ```
 *
 * #### [static|instance] put(item)
 *
 * ```javascript
 * await Model.put({id: 'xxxx', name: 'onigiri'});
 * await model.put()
 * ```
 *
 * #### [static|instance] update(key, updatePart)
 *
 * ```javascript
 * await Model.update({id: 'xxxx'}, {name: 'yaki-onigiri'});
 * await model.update({name: 'yaki-onigiri'})
 * ```
 *
 * #### [static|instance] delete(key)
 *
 * ```javascript
 * await Model.delete({id: 'xxxx'});
 * await model.delete()
 * ```
 */
export class Model {
	static tableName = undefined;
	// get,update,deleteで使用するキー
	static primaryKey = 'id';
	static sortKey = undefined;
	// デフォルトスキーマ + デフォルト値
	// * staticなのでUUIDや時間は設定しないように!!
	static fixedSchema = false; // スキーマ定義以外のキーを許可するか
	// 自動でidを生成するか
	static autoId = true;
	// 作成日時、更新日時を自動で生成するか。Emptyの場合は自動設定しない。
	static timeFormat = 'unix';
	static createdAt = 'createdAt';
	static updatedAt = 'updatedAt';

	init(item = {}, isDynamoJson = false) {
		if (isDynamoJson) {
			item = DB.unmarshall(item);
		}

		const {
			fixedSchema, autoId, primaryKey,
			timeFormat, createdAt, updatedAt,
		} = this.constructor;

		const definedKeys = Object.keys(this);
		const undefinedKeys = Object.keys(item).filter(key => !definedKeys.includes(key));

		for (const key of definedKeys) {
			this[key] = item[key] ?? this[key];
		}

		if (!fixedSchema) {
			for (const key of undefinedKeys) {
				this[key] = item[key];
			}
		}

		if (autoId && !this[primaryKey]) {
			this[primaryKey] = DB.uuid();
		}

		if (createdAt && !this[createdAt]) {
			this[createdAt] = dateTime().format(timeFormat);
		}

		if (updatedAt && !this[updatedAt]) {
			this[updatedAt] = dateTime().format(timeFormat);
		}
	}

	/**
	 * [DEBUG] 環境指定でテーブル名を変更します。
	 * @param {string} env
	 * @returns
	 */
	static env(environment) {
		this.tableName = [
			this.tableName.split('-')[0],
			environment,
		].join('-');
		return this;
	}

	/**
	 * @param {string} indexName（任意）インデックス名
   * @returns {import('../query-builder/index.js').QueryBuilder}
   */
	static query(indexName = undefined) {
		const database = new DB(this.tableName, null, this);
		return database.query(indexName);
	}

	/**
	 * @returns {Promise<{Items: Model[]}>}
	 */
	static async scan() {
		const database = new DB(this.tableName);
		const response = await database.scan();
		return {
			...response,
			Items: response.Items,
		};
	}

	/**
   * @param {number} size チャンクサイズ
   * @param {(items: Model[]) => boolean | void} callback チャンクごとに実行するコールバックです。falseを返すと終了します。
   * @param {Record<string, any> | undefined} nextKey 次のキー。内部で使用します。
   */
	static async chunk(size, callback, nextKey = undefined) {
		const database = new DB(this.tableName);
		await database.chunk(size, callback, nextKey, this);
	}

	/**
   * @param {Record<String, any>} key 検索キー
   * @param {string | undefined}  indexName インデックス
   * @returns {Promise<Model>}
   */
	static async get(key = {}, indexName = undefined) {
		const database = new DB(this.tableName);
		const {Item} = await database.get(key, indexName);
		return Item ? new this(Item) : null;
	}

	/**
   * putは新規挿入またはitemの内容で上書きします。
   * @param {Record<String, any>} item 挿入するアイテム
	 * @returns {Promise<Model>}
   */
	static async put(item) {
		item = JSON.parse(JSON.stringify(item));
		const database = new DB(this.tableName);
		await database.put(item);
		return new this(item);
	}

	/**
   * 単一アイテムを新規作成します。重複するIDがある場合はエラーになります。
   * @param {Record<string, unknown>} item
   * @returns {Promise<Model>}
   */
	static async create(item) {
		item = JSON.parse(JSON.stringify(new this(item)));
		const database = new DB(this.tableName);
		await database.create(this.primaryKey, item);
		return new this(item);
	}

	/**
	 * 単一アイテムを更新します。アイテムが存在しない場合はエラーになります。
   * @param {Record<String, any>} key 検索キー
   * @param {Record<String, any>} updatePart 更新する部分
   * @returns {Promise<void>}
   */
	static async update(key = {}, updatePart = {}) {
		updatePart = JSON.parse(JSON.stringify(updatePart));
		const database = new DB(this.tableName);
		await database.update(key, updatePart);
	}

	/**
	 * 単一アイテムを更新します。アイテムが存在しない場合は新規作成します。
	 * @param {Record<String, any>} key 検索キー
	 * @param {Record<String, any>} updatePart 更新する部分
	 * @returns {Promise<Model>}
	 */
	static async updateOrCreate(key = {}, updatePart = {}) {
		let model = new this({...updatePart, ...key});
		try {
			await this.update(key, updatePart);
		} catch (error) {
			if (error.name !== 'NotFoundError') {
				throw error;
			}

			model = await this.create({
				...updatePart,
				...key,
			});
		}

		return model;
	}

	/**
   * @param {Record<String, any>} key 検索キー
   * @returns {Promise<void>}
   */
	static async delete(key = {}) {
		const database = new DB(this.tableName);
		await database.delete(key);
	}

	/**
   * @returns {this}
   */
	exclueOtherKeys() {
		const definedKeys = Object.keys(new this.constructor());
		const keys = Object.keys(this);
		for (const key of keys) {
			if (!definedKeys.includes(key)) {
				delete this[key];
			}
		}

		return this;
	}

	/**
   * @returns {Promise<this>}
   */
	async reload() {
		const pk = this.constructor.primaryKey;
		const sk = this.constructor.sortKey;
		const item = await this.constructor.get({
			[pk]: this[pk],
			...(sk ? {[sk]: this[sk]} : {}),
		});
		Object.assign(this, item);
		return this;
	}

	/**
   * @returns {Promise<this>}
   */
	async put() {
		await this.constructor.put(this);
		return this;
	}

	/**
	 * @returns {Promise<this>}
	 */
	async create() {
		await this.constructor.create(this);
		return this;
	}

	/**
	 * @param {Record<String, any>} updatePart 更新する部分
   * @returns {Promise<this>}
   */
	async update(updatePart = {}) {
		const pk = this.constructor.primaryKey;
		const sk = this.constructor.sortKey;
		await this.constructor.update({
			[pk]: this[pk],
			...(sk ? {[sk]: this[sk]} : {}),
		}, updatePart);
		Object.assign(this, updatePart);
		return this;
	}

	/**
	 * @deprecated 実装がputと変わらず微妙
	 * @returns {Promise<this>}
	 */
	async save() {
		const pk = this.constructor.primaryKey;
		const updatePart = {
			...this,
		};
		delete updatePart[pk];
		await this.update(updatePart);
		return this;
	}

	/**
	 * アイテムを更新します。アイテムが存在しない場合は新規作成します。
	 * @param {Record<String, any>} updatePart 更新する部分
	 * @returns {Promise<this>}
	 */
	async updateOrCreate(updatePart = {}) {
		const pk = this.constructor.primaryKey;
		const sk = this.constructor.sortKey;
		const key = {
			[pk]: this[pk],
			...(sk ? {[sk]: this[sk]} : {}),
		};
		const model = await this.constructor.updateOrCreate(key, updatePart);
		Object.assign(this, model);
		return this;
	}

	/**
   * @returns {Promise<this>}
   */
	async delete() {
		const pk = this.constructor.primaryKey;
		const sk = this.constructor.sortKey;
		await this.constructor.delete({
			[pk]: this[pk],
			...(sk ? {[sk]: this[sk]} : {}),
		});
		this.deletedAt = Date.now();
		return this;
	}
}
