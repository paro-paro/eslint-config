# @paro-paro/eslint-config 

[![npm](https://img.shields.io/npm/v/@paro-paro/eslint-config.svg?color=a1b858)](https://npmjs.com/package/@paro-paro/eslint-config)

ESLint (flat) config preset for JavaScript, TypeScript, JSX, TSX, Vue 3, JSON, Yaml, Markdown, JSDoc and more.

Credit: [sxzz](https://github.com/sxzz/eslint-config) & [antfu](https://github.com/antfu/eslint-config) 

## Features

* One line setup! :rocket:

* ESLint for both linting and formatting (no prettier) :wrench:

* Strict, although reasonable, out-of-the-box preset.

* Fully customizable. Easily composable.

* First class TypeScript support.

* Vue auto-detection.

* Powered by [@stylistic](https://eslint.style/) and [more](https://github.com/paro-paro/eslint-config#supported-plugins).

## Install

Use your favorite package manager.

```bash
pnpm add -D @paro-paro/eslint-config
``` 

> Requires `eslint >= 8.21.0`

## Usage

`eslint.config.js`

```js
import { paroparo } from '@paro-paro/eslint-config'

export default paroparo()
```

And that's it! :muscle:

**Note:** This setup assumes that you are using ESM in your project.

Even though is **highly discouraged**, you can use CommonJS as well.

```js
const { paroparo } = require('@paro-paro/eslint-config')

module.exports = paroparo()
```

**Note:** The default configuration will throw `ts/no-var-requires` and `ts/no-require-imports` errors when using CommonJS syntax.

### Configuration

Make sure you read the ESLint flat config [documentation](https://eslint.org/docs/latest/use/configure/configuration-files-new) first.

```js
import { paroparo } from '@paro-paro/eslint-config'

export default paroparo(
  {
    // configuration options (see below)
  },

  // extend/override the preset configuration by passing a(n)y number of flat config objects!
  {
    files: ['**/*.ts'],
    rules: {
      'import/order': 'off',
      'no-console': 'off',
      'perfectionist/sort-keys': 'error',
    },
  },

  {
    files: ['**/*.vue'],
    rules: {
      'vue/no-unused-refs': 'warn',
    },
  },

  // ...
)
```

### VS Code

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and configure it to your liking.

```json
{
  "prettier.enable": false,
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": ["typescript", "json"]
}
```

Editor auto-fixing: :sparkles:

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  }
}
```

Editor customizations :boom:

```json
{
  "eslint.rules.customizations": [
    {
      "rule": "stylistic/*",
      "severity": "off"
    },
    {
      "rule": "perfectionist/*",
      "severity": "info"
    }
  ]
}
```

### Configuration Options

#### Types

```ts
function paroparo(options?: ConfigOptions, ...userConfigs: FlatESLintConfigItem[]): FlatESLintConfigItem[]

interface ConfigOptions {
  ts?: boolean
  vue?: boolean
  json?: boolean
  yml?: boolean
  markdown?: boolean
  jsdoc?: boolean
  stylistic?: boolean
  perfectionist?: boolean
  sort?: boolean
  globals?: boolean
  renameRules?: boolean
  gitignore?: boolean | GitIgnoreOptions
  ignores?: boolean | IgnoresOptions
  tsOptions?: TsOptions
  stylisticOptions?: StylisticOptions
}
```

[Check Types Here](https://github.com/paro-paro/eslint-config/blob/main/src/types.ts)

#### Details

* Rules for `typescript` will be automatically enabled if `typescript` package is locally installed.

* Rules for `vue` will be automatically enabled if `vue`, `nuxt` or `vitepress` packages are locally installed.

* Rules for `json`, `yml`, `markdown`, `jsdoc` and `stylistic` are enabled by default.

* You can explicitly `enable/disable` them by setting the appropiate option to `true/false`.

* The `perfectionist` plugin is installed but no rules are enabled by default.

* Use the `ignores` option if you need to extend or override the predefined set of [global ignores](https://github.com/paro-paro/eslint-config/blob/main/src/globs.ts).

* Use the `sort` option if you want to disable sorting of `package.json` and `tsconfig.json` keys.

* Predefined globals can also be disabled using the `globals` option.

* [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore) package is also supported through the `gitignore` option.

* Customize quotes, semi and indentation using the `stylisticOptions` object.

* To enable type aware linting use the `tsOptions` object. The preset does not include any of these rules by default. Check [docs](https://typescript-eslint.io/linting/typed-linting/) for details and caveats.

* Both `tsOptions` and `stylisticOptions` objects have no effect if `ts` or `stylistic` options are explicitly disabled.

## Supported plugins

| Plugin | Rules's prefix |
| --- | --- | 
| [@stylistic/eslint-plugin](https://eslint.style)                                            | `stylistic/*` |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io)                            | `ts/*` |
| [eslint-plugin-antfu](https://github.com/antfu/eslint-plugin-antfu)                         | `antfu/*` |
| [eslint-plugin-eslint-comments](https://mysticatea.github.io/eslint-plugin-eslint-comments) | `eslint-comments/*` |
| [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i)                                 | `import/*` |
| [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)                         | `jsdoc/*` |
| [eslint-plugin-jsonc](https://github.com/ota-meshi/eslint-plugin-jsonc)                     | `jsonc/*` |
| [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n )                     | `node/*` |
| [eslint-plugin-perfectionist](https://eslint-plugin-perfectionist.azat.io)                  | `perfectionist/*` |
| [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)              | `unicorn/*` |
| [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)   | `unused-imports/*` |
| [eslint-plugin-vue](https://eslint.vuejs.org)                                               | `vue/*` |
| [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml)                         | `yml/*` |
| [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown)                  | - |
| [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore)       | - |

Set `renameRules` to `false` in case you want to use `@stylistic` and `@typescript-eslint` as rules's prefixes instead.

> This option does not apply to any other plugin.

## Wiki

You can read more about the rationale behind not using prettier in this great [post](https://antfu.me/posts/why-not-prettier) from [Anthony Fu](https://github.com/antfu).

Also, there is a great [utility package](https://www.npmjs.com/package/eslint-flat-config-viewer) for debugging your ESLint flat config (Anthony, again :astonished:).

All credit to his outstanding and inspirational work.

## Check also

* [@paro-paro/dotfiles](https://github.com/paro-paro/dotfiles) - My dotfiles.

* [@paro-paro/vscode](https://github.com/paro-paro/vscode) - My VS Code setup.

* [@paro-paro/paro-paro-solarized-dark](https://github.com/paro-paro/paro-paro-solarized-dark) - My VS Code theme.

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Antonio Parody](https://github.com/paro-paro)
