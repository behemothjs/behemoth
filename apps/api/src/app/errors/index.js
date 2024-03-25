/**
 * @class
 * @abstract
 * @extends Error
 */
class HttpError extends Error {
	/**
	 * エラー名
	 * @type {string}
	 */
	name;

	/**
	 * ステータスコード
	 * @type {number}
	 */
	status;

	/**
	 * レスポンスに必要な追加情報
	 * @type {Record<string, any>?}
	 */
	data = null;

	/**
	 * @param {string?} message カスタムメッセージ
	 * @param {Record<string, any>?} data レスポンスに必要な追加情報
	 */
	constructor(message, data = null) {
		const error = super(message);
		this.message = error.message;
		this.data = data;
	}
}

/**
 * ## [400] BadRequestError
 * - name: BadRequestError
 * - status: 400
 * - message: リクエストが不正です。
 * @extends HttpError
 */
export class BadRequestError extends HttpError {
	name = 'BadRequestError';
	status = 400;

	/**
	 * @param {string?} message カスタムメッセージ
	 * @param {Record<string, any>?} data レスポンスに必要な追加情報
	 */
	constructor(message = 'リクエストが不正です。', data = null) {
		super(message, data);
	}
}

/**
 * ## [401] UnauthorizedError
 * - name: UnauthorizedError
 * - status: 401
 * - message: 認証情報に誤りがあります。
 * @extends HttpError
 */
export class UnauthorizedError extends HttpError {
	name = 'UnauthorizedError';
	status = 401;

	/**
	 * @param {string?} message カスタムメッセージ
	 * @param {Record<string, any>?} data レスポンスに必要な追加情報
	 */
	constructor(message = '認証情報に誤りがあります。', data = null) {
		super(message, data);
	}
}

/**
 * ## [403] ForbiddenError
 * - name: ForbiddenError
 * - status: 403
 * - message: 権限がありません。
 * @extends HttpError
 */
export class ForbiddenError extends HttpError {
	name = 'ForbiddenError';
	status = 403;

	/**
	 * @param {string?} message カスタムメッセージ
	 * @param {Record<string, any>?} data レスポンスに必要な追加情報
	 */
	constructor(message = '権限がありません。', data = null) {
		super(message, data);
	}
}

/**
 * ## [404] NotFoundError
 * - name: NotFoundError
 * - status: 404
 * - message: リソースが見つかりません。
 * @extends HttpError
 */
export class NotFoundError extends HttpError {
	name = 'NotFoundError';
	status = 404;

	/**
	 * @param {string?} message カスタムメッセージ
	 * @param {Record<string, any>?} data レスポンスに必要な追加情報
	 */
	constructor(message = 'リソースが見つかりません。', data = null) {
		super(message, data);
	}
}

/**
 * ## [500] InternalServerError
 * - name: InternalServerError
 * - status: 500
 * - message: サーバーエラーが発生しました。
 * @extends HttpError
 */
export class InternalServerError extends HttpError {
	name = 'InternalServerError';
	status = 500;

	/**
	 * @param {string?} message カスタムメッセージ
	 * @param {Record<string, any>?} data レスポンスに必要な追加情報
	 */
	constructor(message = 'サーバーエラーが発生しました。', data = null) {
		super(message, data);
	}
}
