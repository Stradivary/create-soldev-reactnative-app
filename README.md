create-soldev-angular-app
=================

Codebase builder for telkomsel angular app


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/create-soldev-angular-app.svg)](https://npmjs.org/package/create-soldev-angular-app)
[![Downloads/week](https://img.shields.io/npm/dw/create-soldev-angular-app.svg)](https://npmjs.org/package/create-soldev-angular-app)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g create-soldev-react-native-app
$ create-soldev-react-native-app COMMAND
running command...
$ create-soldev-react-native-app (--version)
create-soldev-react-native-app/0.1.0 win32-x64 node-v20.16.0
$ create-soldev-react-native-app --help [COMMAND]
USAGE
  $ create-soldev-react-native-app COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`create-soldev-react-native-app help [COMMAND]`](#create-soldev-react-native-app-help-command)
* [`create-soldev-react-native-app init NAME`](#create-soldev-react-native-app-init-name)
* [`create-soldev-react-native-app list`](#create-soldev-react-native-app-list)
* [`create-soldev-react-native-app version`](#create-soldev-react-native-app-version)

## `create-soldev-react-native-app help [COMMAND]`

Display help for create-soldev-react-native-app.

```
USAGE
  $ create-soldev-react-native-app help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for create-soldev-react-native-app.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.10/src/commands/help.ts)_

## `create-soldev-react-native-app init NAME`

Initialize a new React Native or Expo project

```
USAGE
  $ create-soldev-react-native-app init NAME [-d <value>] [-e] [-t <value>] [--typescript] [-v <value>]

ARGUMENTS
  NAME  Name of the project

FLAGS
  -d, --directory=<value>  [default: .] Directory to create the project in
  -e, --expo               Use Expo framework
  -t, --template=<value>   Template to use
  -v, --version=<value>    Version of React Native or Expo to use
      --typescript         Use TypeScript template

DESCRIPTION
  Initialize a new React Native or Expo project
```

_See code: [src/commands/init.ts](https://github.com/Stradivary/create-soldev-react-native-app/blob/v0.1.0/src/commands/init.ts)_

## `create-soldev-react-native-app list`

list template versions from repository

```
USAGE
  $ create-soldev-react-native-app list

DESCRIPTION
  list template versions from repository

EXAMPLES
  $ create-soldev-react-native-app list
```

_See code: [src/commands/list.ts](https://github.com/Stradivary/create-soldev-react-native-app/blob/v0.1.0/src/commands/list.ts)_

## `create-soldev-react-native-app version`

```
USAGE
  $ create-soldev-react-native-app version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.2.11/src/commands/version.ts)_
<!-- commandsstop -->
