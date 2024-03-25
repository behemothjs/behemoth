# @behemothjs/cli

![status](https://img.shields.io/badge/status-PreAlpha-F00)
![node 18.x](https://img.shields.io/badge/node-18.x-0B0)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)

Behemoth CLI

## Install

```bash
npm install --global @behemothjs/cli
```

## Interface Design

### docs

Open Behemoth docs

```txt
behemoth docs
```

### make

Make project.

```txt
behemoth make

Options:
  --name ProjectName
  --type web | api
  --version ${tag}
```

### version

Show current CLI version.

```txt
behemoth version

=> v1.0.0
```

### upgrade

Upgrade latest CLI version.

```txt
behemoth upgrade
```

<!--
### list

List CLI versions.

```txt
behemoth list

=>
v1.5.0 latest <-- current
v1.4.0
v1.3.0 stable
v1.2.0
v1.1.0
v1.0.0
```

### use

Reinstall CLI version.

```txt
behemoth use ${tag}
```
-->