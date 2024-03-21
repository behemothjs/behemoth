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

リリース済みパッケージは [/packages](./packages) で管理しています。

### [behemoth](./packages/behemoth/README.md)

Web制作に必要なシステム構築ツールキット。

- ### [behemoth-core](./packages/behemoth-core/README.md)

  behemoth の低レイヤーサブパッケージ。

## Packages (Unreleased)

リリース前のパッケージは [/packages-unreleased](./packages-unreleased) で管理しています。

### [aws-dynamo](./packages-unreleased/aws-dynamo/README.md)

AWS Dynamo DB 操作キット

### [aws-lambda](./packages-unreleased/aws-lambda/README.md)

AWS Lambda 操作キット

## DEV CLI

このリポジトリのメンテナンス用CLIツールを [./packages-unreleased/cli-dev](./packages-unreleased/cli-dev/README.md) で管理しています。

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

