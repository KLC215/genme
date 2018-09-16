genme
=====

Generate to me the boring code

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/genme.svg)](https://npmjs.org/package/genme)
[![Downloads/week](https://img.shields.io/npm/dw/genme.svg)](https://npmjs.org/package/genme)
[![License](https://img.shields.io/npm/l/genme.svg)](https://github.com/KLC215/genme/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [TODO](#todo)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g genme
$ genme COMMAND
running command...
$ genme (-v|--version|version)
genme/0.0.0 darwin-x64 node-v10.8.0
$ genme --help [COMMAND]
USAGE
  $ genme COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`genme help [COMMAND]`](#genme-help-command)
* [`genme nest`](#genme-nest)

## `genme help [COMMAND]`

display help for genme

```
USAGE
  $ genme help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.2/src/commands/help.ts)_

## `genme nest`

Generate Nest.js boring code

```
USAGE
  $ genme nest

OPTIONS
  -h, --help           show CLI help
  --database=database  Database name
  --host=host          [default: localhost] Database host name
  --password=password  [default: root] Database password
  --port=port          [default: 3306] Database port
  --user=user          [default: root] Database username
```

_See code: [src/commands/nest.ts](https://github.com/KLC215/genme/blob/v0.0.0/src/commands/nest.ts)_
<!-- commandsstop -->

# TODO
- [ ] **REFACTOR CODE !!!**
- [ ] Support more options in **Nest.js**
- [ ] Support **Vue.js** with **Element**
- [ ] Support **React.js** with **Ant design**
- [ ] Support **Flutter**
- [ ] Support **Spring Boot** with **Mybatis**
- [ ] Support **Laravel** 
- [ ] Support **SQL Server** connection
- [ ] Support **Database metadata** in *PDF*, *Word*, *HTML*, *Excel* format
