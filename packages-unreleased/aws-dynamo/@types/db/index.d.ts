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
    static unmarshall: (data: import("@aws-sdk/client-dynamodb").AttributeValue | Record<string, import("@aws-sdk/client-dynamodb").AttributeValue>, options?: import("@aws-sdk/util-dynamodb").unmarshallOptions) => Record<string, any>;
    /**
     * @deprecated
     * unmarshallへ移行してください。
     */
    static unmarshalItem(item: any): Record<string, any>;
    static uuid(): string;
    /**
     * @param {string} tableName
     * @param {string?} region - default: REGION || 'ap-northeast-1'
     * @param {import('../model/index.js').Model?} ModelClass
     */
    constructor(tableName: string, region?: string | null, ModelClass?: import('../model/index.js').Model | null);
    /** @type {string} */
    _tableName: string;
    /** @type {string} */
    _region: string;
    /** @type {DynamoDBDocumentClient} */
    _client: DynamoDBDocumentClient;
    /** @type {import('../model/index.js').Model} */
    ModelClass: import('../model/index.js').Model;
    get config(): {
        region: string;
        tableName: string;
        client: DynamoDBDocumentClient;
    };
    table(tableName: any): this;
    region(region: any): this;
    send(command: any): Promise<import("@aws-sdk/lib-dynamodb").ServiceOutputTypes>;
    /**
     * テーブル内のアイテムをスキャンします。
     * @param {number} limit - default: 1000
     * @param {Record<string, unknown>} nextKey
     */
    scan(limit?: number, nextKey?: Record<string, unknown>): Promise<import("@aws-sdk/lib-dynamodb").ServiceOutputTypes>;
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
    chunk(size: number, callback: () => boolean, nextKey?: Record<string, unknown>, ModelClass?: import('../model/index.js').Model): Promise<void>;
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
    get(Key?: Record<string, unknown>, IndexName?: string): Promise<GetCommandOutput>;
    /**
   * 単一アイテムを作成または更新します。（部分更新不可）
   * @param {Record<string, unknown>} item
   * @returns {Promise<PutCommandOutput>}
   */
    put(item: Record<string, unknown>): Promise<PutCommandOutput>;
    /**
   * 単一アイテムを新規作成します。重複するIDがある場合はエラーになります。
   * @param {Record<string, unknown>} item
   * @returns {Promise<PutCommandOutput>}
   */
    create(primaryKey: any, item: Record<string, unknown>): Promise<PutCommandOutput>;
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
    update(Key?: Record<string, unknown>, item?: Record<string, unknown>): Promise<UpdateCommandOutput>;
    /**
   * 単一アイテムを削除します。
   * @param {Record<string, unknown>} Key
   * @returns {Promise<DeleteCommandOutput>}
   * @example
   * // idが1のアイテムを削除する
   * await db.delete({id: 1});
   */
    delete(Key?: Record<string, unknown>): Promise<DeleteCommandOutput>;
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
    query(indexName?: string): QueryBuilder;
}
export type GetCommandOutput = any;
export type PutCommandOutput = any;
export type UpdateCommandOutput = any;
export type DeleteCommandOutput = any;
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { QueryBuilder } from '../query-builder/index.js';
//# sourceMappingURL=index.d.ts.map