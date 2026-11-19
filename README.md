# @paro-paro/eslint-config

[![npm](https://img.shields.io/npm/v/@paro-paro/eslint-config.svg?color=a1b858)](https://npmjs.com/package/@paro-paro/eslint-config)

ESLint config for TypeScript and JavaScript, with opt-in Vue and Tailwind CSS support.

## Features

- ESLint for both linting and formatting, powered by [@stylistic](https://eslint.style).
- TypeScript and JavaScript out of the box; Vue and Tailwind CSS one option away.
- Correctness rules as errors, style rules as warnings.
- Respects your `.gitignore`.

## Install

```bash
pnpm add -D @paro-paro/eslint-config eslint typescript
```

Requires Node `^22.22.2 || >=24.15.0`, ESLint `>=10.4` and TypeScript `>=4.8.4 <6.1.0`.

## Usage

`eslint.config.js`

```js
import paroparo from '@paro-paro/eslint-config'

export default paroparo()
```

To write the config as `eslint.config.ts`, install `jiti` as well (see [TypeScript configuration files](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files)).

## Options

```js
export default paroparo({
  gitignore: false,
  style: false,
  vue: true,
  tailwind: { stylesheet: new URL('src/main.css', import.meta.url) },
})
```

| Option      | Default     | Description                                            |
| ----------- | ----------- | ------------------------------------------------------ |
| `gitignore` | `true`      | Ignore the files listed in the project's `.gitignore`. |
| `style`     | `true`      | Style rules: formatting, ordering and naming.          |
| `vue`       | `false`     | Lint `.vue` files, script and template.                |
| `tailwind`  | `undefined` | Lint Tailwind CSS classes. See below.                  |

### Tailwind CSS

Requires [`eslint-plugin-better-tailwindcss`](https://github.com/schoero/eslint-plugin-better-tailwindcss):

```bash
pnpm add -D eslint-plugin-better-tailwindcss
```

| Option       | Required | Description                                                                                    |
| ------------ | -------- | ---------------------------------------------------------------------------------------------- |
| `stylesheet` | yes      | Path to your Tailwind CSS stylesheet (v4).                                                     |
| `cwd`        | no       | The directory from which `tailwindcss` is resolved. Defaults to the directory of `stylesheet`. |

Relative paths are resolved from the directory ESLint runs in. If ESLint may run from elsewhere (editors, monorepos), use `new URL('src/main.css', import.meta.url)`, which resolves from the config file.

Classes are checked in `class`, `:class`, utility calls (`tv`, `cva`, `clsx`…), [Nuxt UI](https://ui.nuxt.com)'s `:ui` prop and `defineAppConfig` theme.
Class order and whitespace are considered stylistic rules, and follow the `style` option.

## Overrides

Any number of flat config objects can follow the options. They are applied last, so they override the preset.

```js
export default paroparo(
  { vue: true },
  {
    rules: {
      '@stylistic/quotes': ['warn', 'double'],
    },
  },
  {
    files: ['components/**/*.vue'],
    rules: {
      'unicorn/filename-case': ['warn', { case: 'pascalCase' }],
    },
  },
  {
    files: ['scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },
)
```

## What's included

| Files                         | Config                  | Notes                                             |
| ----------------------------- | ----------------------- | ------------------------------------------------- |
| `.ts`, `.mts`, `.cts`, `.tsx` | `paroparo/typescript`   | Undefined names are left to TypeScript.           |
| `.js`, `.mjs`, `.cjs`, `.jsx` | `paroparo/javascript`   | `no-undef` with browser, Node and ES2021 globals. |
| `.vue`                        | `paroparo/vue`          | Only with `vue: true`.                            |
| All of the above              | `paroparo/tailwind`     | Only with the `tailwind` option.                  |
| `.d.ts`                       | `paroparo/declarations` |                                                   |

Each one starts from the recommended presets of [`@eslint/js`](https://eslint.org/docs/latest/rules), [`typescript-eslint`](https://typescript-eslint.io) and [`eslint-plugin-vue`](https://eslint.vuejs.org), then applies its own correctness rules (errors) and style rules (warnings).

Not included:

- Type-aware rules.
- HTML, CSS, JSON, YAML, TOML and Markdown. Use a formatter such as [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for those files.

## Plugins

| Plugin                                                                                                     | Prefix                 |
| ---------------------------------------------------------------------------------------------------------- | ---------------------- |
| [@stylistic/eslint-plugin](https://eslint.style)                                                           | `@stylistic/*`         |
| [typescript-eslint](https://typescript-eslint.io)                                                          | `@typescript-eslint/*` |
| [eslint-config-flat-gitignore](https://github.com/antfu/eslint-config-flat-gitignore)                      | -                      |
| [eslint-plugin-antfu](https://github.com/antfu/eslint-plugin-antfu)                                        | `antfu/*`              |
| [eslint-plugin-better-tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss) (optional) | `better-tailwindcss/*` |
| [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)                                  | `import-x/*`           |
| [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)                                        | `jsdoc/*`              |
| [eslint-plugin-perfectionist](https://perfectionist.dev)                                                   | `perfectionist/*`      |
| [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)                             | `unicorn/*`            |
| [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)                  | `unused-imports/*`     |
| [eslint-plugin-vue](https://eslint.vuejs.org)                                                              | `vue/*`                |

## Migrating from v2

- **Requirements:** ESLint `>=10.4`, Node `^22.22.2 || >=24.15.0`. The package is ESM only.
- **Options:** only `vue`, `tailwind`, `style` and `gitignore` remain.
  - `ts` and `tsOptions`: TypeScript is always on; type-aware rules are not included.
  - `vue`: no longer detected from installed packages; set `vue: true`.
  - `json`, `yml`, `markdown`: these files are no longer linted. Use a formatter for them.
  - `jsdoc`, `sort`, `globals`, `stylisticOptions`: removed. JSDoc formatting and import and export sorting are part of `style`; JavaScript files always get browser, Node and ES2021 globals.
  - `ignores`: removed, along with the predefined excluded globs. Add a `globalIgnores([...])` config after the options.
  - `stylistic`: renamed to `style`.
  - `gitignore`: now a boolean.
  - `renameRules`: removed. Rules use their plugins' own prefixes.
- **Rule prefixes in overrides:** `ts/*` → `@typescript-eslint/*`, `stylistic/*` → `@stylistic/*`, `import/*` → `import-x/*`. The `node/*`, `jsonc/*`, `yml/*` and `eslint-comments/*` rules are gone, and only the formatting `jsdoc/*` rules remain.
- **The function returns a Promise.** `export default paroparo()` works as before; code that spreads or edits the result must `await` it first.

## Inspecting the config

```bash
npx eslint --inspect-config
```

## Credits

The idea of using ESLint for formatting comes from this [post](https://antfu.me/posts/why-not-prettier) by [Anthony Fu](https://github.com/antfu). All credit to his outstanding and inspirational work.

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Antonio Parody](https://github.com/paro-paro)
