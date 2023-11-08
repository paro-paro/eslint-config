# @paro-paro/eslint-config 

[![npm](https://img.shields.io/npm/v/@paro-paro/eslint-config.svg?color=a1b858)](https://npmjs.com/package/@paro-paro/eslint-config)

ESLint [flat](https://eslint.org/docs/latest/use/configure/configuration-files-new) config preset for JavaScript, TypeScript, JSX, TSX, Vue 3, JSON, Yaml, Markdown.

Credit: [sxzz](https://github.com/sxzz/eslint-config) & [antfu](https://github.com/antfu/eslint-config) 

## Features

- 2 lines setup.
- 1 tool for both linting & formatting (no prettier). 
- Strict (although sensible) out-of-the-box preset.
- Fully customizable. Easily composable.
- Vue auto detection.
- First class TypeScript support.
- Powered by [@stylistic](https://eslint.style/) and more.

## Supported plugins

- wip

## Install

```bash
npm i -D @paro-paro/eslint-config
```

```bash
yarn add -D @paro-paro/eslint-config
```

```bash
pnpm add -D @paro-paro/eslint-config
```

> Requires `eslint >= 8.21.0`

## Usage

```js
// eslint.config.js
import { paroparo } from '@paro-paro/eslint-config'

export default paroparo()
```

And that's it!

### Configuration

```js
// eslint.config.js
import { paroparo } from '@paro-paro/eslint-config'

export default paroparo(
  { 
    // configuration options (see below)
  },

  // pass as many flat config objects as you need and extend/override the configuration limitless!
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'off',
      'import/order': 'off',
      'perfectionist/sort-keys': 'warn'
    },
  },
  
  {
    ignores: ['**/files'],
  },
  
  // ...
)
```

### VS Code

```jsonc
{
  "prettier.enable": false, // disable prettier!
  "eslint.enable": true,
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

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Antonio Parody](https://github.com/paro-paro)
