# Behemoth（ベヒーモス）

![node 18.x](https://img.shields.io/badge/node-18.x-0B0)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

Web制作に必要なシステム構築エンジン

## npm workspaces

[./packages](./packages) をワークスペースに設定しています。

## npm script

npm-run-all を入れてありますので、連続的なスクリプトに対応できます。  
複雑なスクリプトを実行したい場合は [./scripts](./scripts) にファイルを作成して実行します。

## Packages

### [behemoth](./packages/behemoth/README.md)

Web制作に必要なシステム構築ツールキット。

- ### [behemoth-core](./packages/behemoth-core/README.md)

  behemoth の低レイヤーサブパッケージ。

## DEV CLI

このリポジトリのメンテナンス用CLIツールを [./packages/behemoth-dev](./packages/behemoth-dev/README.md) で管理しています。

### コマンド

```dev``` と打てば説明が出てきます。

```bash
dev <category> <action>
```

### パッケージの追加

パッケージ名は自動で kebab-case に変換されます。

```bash
dev package add <package-name>
```

