# @behemothjs/aws-lambda

![node 18.x](https://img.shields.io/badge/node-18.x-0B0)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

AWS Lambda 操作パッケージ

## Install

```bash
npm install @behemothjs/aws-lambda
```

## Example

```javascript
import Lambda from '@psinc/aws-lambda';

const lambda = new Lambda({
  region: (Optional) REGION / AWS_REGION が設定されていれば自動設定
  response: (default: false) Lambdaのレスポンスを含めるかどうか
});

// post()はレスポンスを待って結果を返します。
const response = await lambda
  .to('FunctionName')
  .log() // (Optional) レスポンスにログを含めたい場合に使用します。＊Lambddaレスポンスが必要
  .post(payloa);

// push()はレスポンスを待たず非同期で実行されます。
await lambda.to('FunctionName').posh(payloa);
```
