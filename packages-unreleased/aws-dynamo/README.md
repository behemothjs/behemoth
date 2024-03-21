# @behemothjs/aws-dynamo

![node 18.x](https://img.shields.io/badge/node-18.x-0B0)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

AWS DynamoDB 操作キット + ORMベースモデル

## Install

```bash
npm install @behemothjs/aws-dynamo
```

## DB

```javascript
import {DB} from '@psinc/aws-dynamo';

const db = new DB();

const item = awai db
  .table('users')
  .get({id: 1});

const items = await db
  .table('users')
  .scan();

await db
  .table('users')
  .put({id: 1, name: 'test'});

await db
  .table('users')
  .update({id: 1}, {name: 'test'});

await db
  .table('users')
  .delete({id: 1});

await db
  .table('users')
  .query()
  .where('id', 1)
  .whereBetween('createdAt', '2023-01-01', '2023-01-03') // key, from, to
  .get(); // get() / first() / chunk() / each()

await db
  .table('users')
  .chunk(1000, async items => {
   // 1000件のアイテムを処理する
   // return false で停止
  });

await db
  .table('users')
  .each(async item => {
   // 1件ずつアイテムを処理する
   // return false で停止
  })
```

## Model

DBにテーブル定義、スキーマ定義を追加したもの。  
インスタンスからの update() / delete() にも対応しています。
