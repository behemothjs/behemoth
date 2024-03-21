# Behemoth（ベヒーモス）

Web制作に必要なシステム構築エンジン

## Install

```bash
npm install @behemothjs/behemoth
```

## Features

### 🍄 Schema

モデルクラスなどを作成する際に役立つスキーマ処理ツール。

```javascript
import {Schema} from '@behemothjs/behemoth';

const schema = new Schema({
  ...configuration, // (Optional)
  // [defaults]
  // allowAdditionalKeys: false,
  // allowUndefinedKeys: false,
  // idStrategy: () => crypto.randomUUID(),
  // timestampStrategy: () => new Date().toISOString(),
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
