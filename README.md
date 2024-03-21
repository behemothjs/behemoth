<link href="./readme.css" rel="stylesheet"></link>

<header class="hero">
  <div class="hero-inner">
    <div class="title">Behemoth</div>
    <div class="sub-title">Web Development Engine</div>
  </div>
</header>

![node 18.x](https://img.shields.io/badge/node-18.x-0B0)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

# Behemoth（ベヒーモス）

Web制作に必要なシステム構築エンジン

## npm workspaces

[./packages](./packages) をワークスペースに設定しています。

### 開発用CLI

このリポジトリの開発時に使用するCLIを [./packages/behemoth-dev](./packages/behemoth-dev) にて作成しています。

#### パッケージの追加

```bash
dev package add ${packageName}
```

## npm script

npm-run-all を入れてありますので、連続的なスクリプトに対応できます。  
複雑なスクリプトを実行したい場合は [./scripts](./scripts) にファイルを作成して実行します。

## Packages

### [behemoth](./packages/behemoth/README.md)

Web制作に必要なシステム構築ツールキット。

- ### [behemoth-core](./packages/behemoth-core/README.md)

  behemoth の低レイヤーサブパッケージ。

### [behemoth-dev](./packages/behemoth-dev/README.md)

このリポジトリのメンテナンス用CLIツール。
