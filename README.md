# behemoth

Web Tool Kit

## npm workspaces

[./packages](./packages) をワークスペースに設定しています。

### 開発用CLI

このリポジトリの開発時に使用するCLIを [./packages/cli-dev](./packages/cli-dev) にて作成しています。

#### パッケージの追加

```bash
cli package add ${packageName}
```

## npm script

npm-run-all を入れてありますので、連続的なスクリプトに対応できます。  
複雑なスクリプトを実行したい場合は [./scripts](./scripts) にファイルを作成して実行します。
