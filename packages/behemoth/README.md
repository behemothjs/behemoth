# Behemoth（ベヒーモス）

![status](https://img.shields.io/badge/status-Alpha-F00)
![node 18.x](https://img.shields.io/badge/node-18.x-0B0)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

Web制作に必要なシステム構築エンジン

## 🚫 Notice

```ja
このプロジェクトは現在開発中です。仕様変更を伴うためリリースまでご利用はお控え下さい。
```

```en
This project is currently under development. Please refrain from using it until release due to specification changes.
```

```zh-CN
该项目目前正在开发中。由于规格变更，请等到发布后再使用。
```

```es
Este proyecto está actualmente en desarrollo. Por favor, absténgase de usarlo hasta su lanzamiento debido a cambios en las especificaciones.
```

```fr
Ce projet est actuellement en cours de développement. Veuillez vous abstenir de l'utiliser jusqu'à sa sortie en raison de modifications des spécifications.
```

## Install

```bash
npm install @behemothjs/behemoth
```

## Features

### 🍄 App

メインオブジェクトです。

#### Global Configuration for All Modules

```javascript
import {behemoth as app} from '@behemothjs/behemoth';

app.configure({
 schema: SchemaConfig,
 logger: LoggerConfig,
});
```

#### Logger alias

```javascript
app.log(message);
app.warn(message);
app.error(message);
```

#### Observer alias

```javascript
// Notify
app.notify(channel, topic, payload);

// Subscribe
const subscription = app.listen(channel, topic, (event) => {
 app.log(event);
});

// Unsubscribe
subscription.remove();
```

### 🍄 Schema

モデルクラスなどを作成する際に役立つスキーマ処理ツール。

#### Global Configuration for Schema Class

```javascript
import {Schema} from '@behemothjs/behemoth';

Schema.configure({
  // [defaults]
  allowAdditionalKeys: false,
  allowUndefinedKeys: false,
  idStrategy: () => crypto.randomUUID(),
  timestampStrategy: () => new Date().toISOString(),
})
```

#### Example

```javascript
import {schema} from '@behemothjs/behemoth';

// Temporary Configuration
schema.configure({
  // [defaults]
  allowAdditionalKeys: false,
  allowUndefinedKeys: false,
  idStrategy: () => crypto.randomUUID(),
  timestampStrategy: () => new Date().toISOString(),
})

class SampleSchema {
  id;
  name;
  description;

  /**
   * @param {SampleSchema} data
   */
  constructor(data) {
    // Before: Input undefind key -> Throw Error
    // After:  not set keys       -> Set undefined to null
    schema.assign(this, data);

    // If `id` is empty, set the UUID.
    schema.autoId(this, 'id');

    // If `createdAt/updatedAt` is empty, set the DateTime.
    schema.autoTimestamp(this, 'createdAt');
    schema.autoTimestamp(this, 'updatedAt');
  }
}

const sampleSchema = new SampleSchema({
  name: 'Behemoth',
  description: 'This is web tool kit.'
})

console.log(sampleSchema)
```

```javascript
SampleSchema {
  id: '8481d7e4-478c-4233-b4a1-7ea6d7d63749',
  name: 'Behemoth',
  description: 'This is web tool kit.',
  createdAt: '2024-03-21T07:15:45.092Z',
  updatedAt: '2024-03-21T07:15:45.092Z',
}
```

### 🍄 Observer

PubSub Module

```javascript
import {observer} from '@behemothjs/behemoth';

// Notify
observer.notify('channelName', 'topicName', payload);

// Subscribe
const subscription = Observer.listen('channelName', 'topicName', (event) => {
  console.log(event);
});

// Unsubscribe
subscription.remove();
```

### 🍄 Log

Logging Toool

```javascript
import {log} from '@behemothjs/behemoth';

// Configuration or Set environment valiable: LOG_LEVEL
log.configure({logLevel: 'WARN'}); // LOG / INFO / WARN / ERROR / SILENT

log.log('LOG');     // console.log('LOG')
log.info('INFO');   // console.info('INFO')
log.warn('WARN');   // console.warn('WARN')
log.error('ERROR'); // console.error('ERROR')
```

このログは Observer を介して出力されるため、ログ収集のストリーミング処理に有効です。

```javascript
Observer.listen('Log', 'ERROR', async event => {
  const {payload} = event;
  await otherStreamingApi.push(payload);
});
```
