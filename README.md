# Behemoth

![stability](https://img.shields.io/badge/stability-Alpha-F00)
![node 18.x](https://img.shields.io/badge/node-18.x-0B0)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

Documentation for Contoributers.  
Main Document → [Behemoth](./packages/behemoth/README.md)

## Document Translation

[🇯🇵 日本語](./README_ja.md)

## 🚫 Project stability is "Alpha"

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

## npm workspaces [ monorepo ]

[./packages](./packages) is set up as a workspace.

## npm script

`npm-run-all` is included, allowing for sequential script execution.
For complex scripts, create a file in [./scripts](./scripts) and execute it.

## Packages

Released packages are managed in [/packages](./packages).

### [[main] behemoth](./packages/behemoth/README.md)

A toolkit for building systems necessary for web production.

- ### [behemoth-core](./packages/behemoth-core/README.md)

  A low-layer subpackage of behemoth.

## Packages (Unreleased)

Packages that are yet to be released are managed in [/packages-unreleased](./packages-unreleased).

### [aws-dynamo](./packages-unreleased/aws-dynamo/README.md)

An AWS Dynamo DB operation kit.

### [aws-lambda](./packages-unreleased/aws-lambda/README.md)

An AWS Lambda operation kit.

## DEV CLI

A CLI tool for maintaining this repository is managed at [./packages-unreleased/cli-dev](./packages-unreleased/cli-dev/README.md).

### Commands

Type `dev` to see the instructions.

```bash
dev <category> <action>
```

### Adding a Package

Package names are automatically converted to kebab-case.

```bash
dev package add <package-name>
```
