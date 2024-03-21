# Behemoth（ベヒーモス）

Web制作に必要なシステム構築ツールキット

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
