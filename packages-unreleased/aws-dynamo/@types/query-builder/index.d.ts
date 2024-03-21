export class QueryBuilder {
    /**
     * @param {} db
     */
    constructor(db: any);
    _db: any;
    _indexName: any;
    _limit: any;
    _nextKey: any;
    _isASC: boolean;
    _expressions: any[];
    get config(): {
        db: any;
        indexName: any;
        limit: any;
        nextKey: any;
        isASC: boolean;
        expressions: any[];
    };
    /**
   * 利用するインデックスを指定します。
   * @param {string} indexName
   * @returns {QueryBuilder}
   */
    index(indexName: string): QueryBuilder;
    /**
   * アイテム返却数を指定します。
   *
   * @param {number} limit
   * @returns {QueryBuilder}
   */
    limit(limit?: number): QueryBuilder;
    nextKey(nextKey: any): this;
    /**
   * 昇順か降順を指定します。
   * 指定しなければ降順になります。
   *
   * @param {'ASC|asc|DESC|desc'} AscOrDesc ASC（昇順）/DESC（降順）
   * @returns {QueryBuilder}
   */
    order(AscOrDesc?: 'ASC|asc|DESC|desc'): QueryBuilder;
    /**
   * 昇順で取り出します。
   * @returns {QueryBuilder}
   */
    desc(): QueryBuilder;
    /**
   * 昇順で取り出します。
   * @returns {QueryBuilder}
   */
    latest(): QueryBuilder;
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
    where(...args: any[]): QueryBuilder;
    /**
     * @deprecated 使えないようです。
   * @param {string} key
   * @param {string[]|number[]} values 最大 100 個の値を指定できます。
   * @returns {QueryBuilder}
   */
    whereIn(key: string, values: string[] | number[]): QueryBuilder;
    /**
   * キーの値がfrom以上、to以下のアイテムを取得します。
   * @param {string} key
   * @param {string|number[]} fromAndTo
   * @returns {QueryBuilder}
   */
    whereBetween(key: string, [from, to]: string | number[]): QueryBuilder;
    /**
   * キーの値が指定した文字列で始まるアイテムを取得します。
   * @param {string} key
   * @param {string} substring
   * @returns {QueryBuilder}
   */
    beginsWith(key: string, substring: string): QueryBuilder;
    /**
     * 生成した条件でコマンドを作成します。
     * @returns {ScanCommand|QueryCommand}
     */
    toCommand(): ScanCommand | QueryCommand;
    /**
     * 最大4MBまでのデータを取得します。
     * @returns {Promise<*>}
     */
    get(): Promise<any>;
    /**
     * 最初のアイテムを取得します。
     * @returns {Promise<*>}
     */
    first(): Promise<any>;
    /**
     * テーブル内のアイテムを検索した結果をコールバック関数に渡します。
     * @param {number} size
     * @param {Promise<boolean>} callback
     * @returns {Promise<void>}
     */
    chunk(size: number, callback: Promise<boolean>): Promise<void>;
    /**
     * テーブル内のアイテムを検索した結果を１件ずつコールバック関数に渡します。
     * @param {Promise<boolean>} callback
     * @param {number} chunkSize (Optional) 1回の取得で取得するアイテム数
     * @returns {Promise<void>}
     */
    each(callback: Promise<boolean>, chunkSize?: number): Promise<void>;
}
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
//# sourceMappingURL=index.d.ts.map