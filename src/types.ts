import type { FlatESLintConfigItem } from 'eslint-define-config'

interface FlatESLintConfigItemExtend extends FlatESLintConfigItem {
  /**
   * Custom name for each flat config object.
   */
  name?: string
}

interface ConfigOptions {
  /**
   * Enable or disable TypeScript support.
   *
   * @default Autodetected based on locally installed dependencies.
   */
  ts?: boolean

  /**
   * Enable or disable Vue 3 support.
   *
   * @default Autodetected based on locally installed dependencies.
   */
  vue?: boolean

  /**
   * Enable or disable JSON, JSONC and JSON5 support.
   *
   * @default true
   */
  json?: boolean

  /**
   * Enable or disable YAML support.
   *
   * @default true
   */
  yml?: boolean

  /**
   * Enable or disable Markdown support.
   *
   * @default true
   */
  markdown?: boolean

  /**
   * Enable or disable JSDoc rules.
   *
   * @default true
   */
  jsdoc?: boolean

  /**
   * Enable or disable stylistic rules.
   *
   * Applies to all supported languages.
   *
   * @default true
   */
  stylistic?: boolean

  /**
   * Install perfectionist plugin.
   *
   * No rules from this plugin are enabled by default.
   *
   * @default true
   */
  perfectionist?: boolean

  /**
   * Enable or disable default sorting of package.json and tsconfig.json keys.
   *
   * Only applies if JSON is enabled.
   *
   * @default true
   */
  sort?: boolean

  /**
   * Enable or disable globals.
   *
   * Included: `node`, `browser` and `es2021`.
   *
   * @default true
   */
  globals?: boolean

  /**
   * Rename typescript and stylistic rules's prefixes.
   *
   * @default true
   */
  renameRules?: boolean

  /**
   * Support for `eslint-config-flat-gitignore` package.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | GitIgnoreOptions

  /**
   * Enable or disable a predefined set of global ignores.
   *
   * You can also extend or override the predefined set by passing an options object.
   *
   * @see https://github.com/paro-paro/eslint-config/blob/main/src/globs.ts
   * @default true
   */
  ignores?: boolean | IgnoresOptions

  /**
   * Pass additional options to the typescript configuration object.
   *
   * This option has no effect if `ts` is explicitly disabled.
   */
  tsOptions?: TsOptions

  /**
   * Pass additional options to the stylistic configuration object.
   *
   * This option has no effect if `stylistic` is explicitly disabled.
   */
  stylisticOptions?: StylisticOptions
}

interface GitIgnoreOptions {
  /**
   * File or array of files to scan for ignores patterns.
   *
   * @default '.gitignore'
   */
  files?: string | string[]

  /**
   * Throws if a specified file is not found.
   *
   * @default true
   */
  strict?: boolean
}

interface IgnoresOptions {
  /**
   * Array of globs to extend or override.
   *
   * @default []
   */
  globs?: string[]

  /**
   * Override the predefined set of global ignores instead of extending them.
   *
   * @default false
   */
  override?: boolean
}

interface TsOptions {
  /**
   * Pass relative tsconfig paths to enable type aware linting rules.
   *
   * No type aware rules are enabled by default.
   *
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[]
}

interface StylisticOptions {
  /**
   * Enable or disable jsx-* stylistic rules.
   *
   * @default true
   */
  jsx?: boolean

  /**
   * Set default identation.
   *
   * @default 2
   */
  indent?: number | 'tab'

  /**
   * Set quotes style.
   *
   * @default 'single'
   */
  quotes?: 'single' | 'double'

  /**
   * Use semicolons at the end of statements.
   *
   * @default 'never'
   */
  semi?: 'never' | 'always'
}

export type {
  FlatESLintConfigItem,
  FlatESLintConfigItemExtend,
  ConfigOptions,
  GitIgnoreOptions,
  IgnoresOptions,
  TsOptions,
  StylisticOptions,
}
