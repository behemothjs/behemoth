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
    static tableName: any;
    static primaryKey: string;
    static sortKey: any;
    static fixedSchema: boolean;
    static autoId: boolean;
    static timeFormat: string;
    static createdAt: string;
    static updatedAt: string;
    /**
     * [DEBUG] 環境指定でテーブル名を変更します。
     * @param {string} env
     * @returns
     */
    static env(environment: any): typeof Model;
    /**
     * @param {string} indexName（任意）インデックス名
   * @returns {import('../query-builder/index.js').QueryBuilder}
   */
    static query(indexName?: string): import('../query-builder/index.js').QueryBuilder;
    /**
     * @returns {Promise<{Items: Model[]}>}
     */
    static scan(): Promise<{
        Items: Model[];
    }>;
    /**
   * @param {number} size チャンクサイズ
   * @param {(items: Model[]) => boolean | void} callback チャンクごとに実行するコールバックです。falseを返すと終了します。
   * @param {Record<string, any> | undefined} nextKey 次のキー。内部で使用します。
   */
    static chunk(size: number, callback: (items: Model[]) => boolean | void, nextKey?: Record<string, any> | undefined): Promise<void>;
    /**
   * @param {Record<String, any>} key 検索キー
   * @param {string | undefined}  indexName インデックス
   * @returns {Promise<Model>}
   */
    static get(key?: Record<string, any>, indexName?: string | undefined): Promise<Model>;
    /**
   * putは新規挿入またはitemの内容で上書きします。
   * @param {Record<String, any>} item 挿入するアイテム
     * @returns {Promise<Model>}
   */
    static put(item: Record<string, any>): Promise<Model>;
    /**
   * 単一アイテムを新規作成します。重複するIDがある場合はエラーになります。
   * @param {Record<string, unknown>} item
   * @returns {Promise<Model>}
   */
    static create(item: Record<string, unknown>): Promise<Model>;
    /**
     * 単一アイテムを更新します。アイテムが存在しない場合はエラーになります。
   * @param {Record<String, any>} key 検索キー
   * @param {Record<String, any>} updatePart 更新する部分
   * @returns {Promise<void>}
   */
    static update(key?: Record<string, any>, updatePart?: Record<string, any>): Promise<void>;
    /**
     * 単一アイテムを更新します。アイテムが存在しない場合は新規作成します。
     * @param {Record<String, any>} key 検索キー
     * @param {Record<String, any>} updatePart 更新する部分
     * @returns {Promise<Model>}
     */
    static updateOrCreate(key?: Record<string, any>, updatePart?: Record<string, any>): Promise<Model>;
    /**
   * @param {Record<String, any>} key 検索キー
   * @returns {Promise<void>}
   */
    static delete(key?: Record<string, any>): Promise<void>;
    init(item?: {}, isDynamoJson?: boolean): void;
    /**
   * @returns {this}
   */
    exclueOtherKeys(): this;
    /**
   * @returns {Promise<this>}
   */
    reload(): Promise<this>;
    /**
   * @returns {Promise<this>}
   */
    put(): Promise<this>;
    /**
     * @returns {Promise<this>}
     */
    create(): Promise<this>;
    /**
     * @param {Record<String, any>} updatePart 更新する部分
   * @returns {Promise<this>}
   */
    update(updatePart?: Record<string, any>): Promise<this>;
    /**
     * @deprecated 実装がputと変わらず微妙
     * @returns {Promise<this>}
     */
    save(): Promise<this>;
    /**
     * アイテムを更新します。アイテムが存在しない場合は新規作成します。
     * @param {Record<String, any>} updatePart 更新する部分
     * @returns {Promise<this>}
     */
    updateOrCreate(updatePart?: Record<string, any>): Promise<this>;
    /**
   * @returns {Promise<this>}
   */
    delete(): Promise<this>;
    deletedAt: number;
}
//# sourceMappingURL=index.d.ts.map