# @paro-paro/eslint-config 

[![npm](https://img.shields.io/npm/v/@paro-paro/eslint-config.svg?color=a1b858)](https://npmjs.com/package/@paro-paro/eslint-config)

ESLint flat config preset for JavaScript, TypeScript, JSX, TSX, Vue 3, JSON, Yaml, JSDoc, Markdown.

Credit: [sxzz](https://github.com/sxzz/eslint-config) & [antfu](https://github.com/antfu/eslint-config) 

## Features

* One line setup!

* ESLint for both linting & formatting (no prettier).

* Strict (although reasonable) out-of-the-box preset.

* Fully customizable. Easily composable.

* First class TypeScript support.

* Vue auto detection.

* Powered by [@stylistic](https://eslint.style/) and [many more](https://github.com/paro-paro/eslint-config#supported-plugins).

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

*Note:* This setup assumes that you are using ESM in your project by setting `type: "module"` in package.json.

Even though is **highly discouraged**, you can use CommonJS as well.

```js
const { paroparo } = require('@paro-paro/eslint-config')

module.exports = paroparo()
```

### Configuration

Make sure you read the [eslint flat config documentation](https://eslint.org/docs/latest/use/configure/configuration-files-new) first.

```js
import { paroparo } from '@paro-paro/eslint-config'

export default paroparo(
  {
    // configuration options for paroparo preset (see below)
  },

  // extend/override the configuration by passing a(n)y number of flat config objects
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'off',
      'import/order': 'off',
      'perfectionist/sort-keys': 'error'
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

```json
{
  "prettier.enable": false, // disable prettier
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "json",
    "jsonc",
    "yaml",
    "markdown"
  ]
}
```

For auto-fix:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  }
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
  yaml?: boolean
  jsdoc?: boolean
  markdown?: boolean
  perfectionist?: boolean
  stylistic?: boolean
  tsOptions?: TsOptions
  stylisticOptions?: StylisticOptions
  extendIgnores?: ExtendIgnores
}
```

[Check Types](https://github.com/paro-paro/eslint-config/blob/main/src/types.ts)

#### Details

* Rules for `typescript`, `json`, `yaml`, `markdown` and `stylistic` are enabled by default. 

* Rules for `vue` will be automatically enabled if `vue`, `nuxt` or `vitepress` packages are locally installed.

* You can explicitly `enable/disable` them by setting the appropiate option to `true/false`.

* `tsOptions` and `stylisticOptions` have no effect if `ts` or `stylistic` are explicitly disabled.

* Use the `extendIgnores` option if you need to extend or override the predefined set of global ignores.

* ESLint flat config does not use `.eslintignore` anymore.

* The `perfectionist` plugin is installed by default but no rules are enabled.

## Supported plugins

| Plugin | Rules prefix |
| --- | --- | 
| [@stylistic/eslint-plugin](https://eslint.style)                                            | `@stylistic/*` |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io)                            | `@typescript-eslint/*` |
| [eslint-plugin-antfu](https://github.com/antfu/eslint-plugin-antfu)                         | `antfu/*` |
| [eslint-plugin-eslint-comments](https://mysticatea.github.io/eslint-plugin-eslint-comments) | `eslint-comments/*` |
| [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i)                                 | `import/*` |
| [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)                         | `jsdoc/*` |
| [eslint-plugin-jsonc](https://github.com/ota-meshi/eslint-plugin-jsonc)                     | `jsonc/*` |
| [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown)                  | - |
| [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n )                     | `node/*` |
| [eslint-plugin-perfectionist](https://eslint-plugin-perfectionist.azat.io)                  | `perfectionist/*` |
| [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)              | `unicorn/*` |
| [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)   | `unused-imports/*` |
| [eslint-plugin-vue](https://eslint.vuejs.org)                                               | `vue/*` |
| [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml)                         | `yaml/*` |

## Wiki

You can read more about the rationale behind not using prettier in this great post [Why I don't use Prettier](https://antfu.me/posts/why-not-prettier) from Anthony Fu.

Also, there is a great [utility package](https://www.npmjs.com/package/eslint-flat-config-viewer) for debugging your eslint flat config (Anthony, again :astonished:).

All credit to his outstanding and inspirational work: [Anthony Fu](https://github.com/antfu)

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Antonio Parody](https://github.com/paro-paro)
