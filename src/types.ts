/* eslint perfectionist/sort-interfaces: ['error', { type: 'natural', order: 'asc' }] */
import type { FlatESLintConfigItem } from 'eslint-define-config'

interface FlatESLintConfigItemExtend extends FlatESLintConfigItem {
  /**
   * Custom name for each flat config object.
   */
  name?: string
}

interface ConfigOptions {
  /**
   * Support for `eslint-config-flat-gitignore` package.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   *
   * @default false
   */
  gitignore?: GitIgnoreOptions | boolean

  /**
   * Enable or disable the predefined set of globals.
   *
   * Included: `node`, `browser` and `es2021`.
   *
   * @default true
   */
  globals?: boolean

  /**
   * Enable, disable, extend or override the predefined set of excluded globs.
   *
   * @see https://github.com/paro-paro/eslint-config/blob/main/src/globs.ts
   *
   * @default true
   */
  ignores?: IgnoresOptions | boolean

  /**
   * Enable or disable JSDoc rules.
   *
   * @default true
   */
  jsdoc?: boolean

  /**
   * Enable or disable JSON, JSONC and JSON5 support.
   *
   * @default true
   */
  json?: boolean

  /**
   * Enable or disable Markdown support.
   *
   * @default true
   */
  markdown?: boolean

  /**
   * Rename typescript and stylistic rules.
   *
   * @default true
   */
  renameRules?: boolean

  /**
   * Enable or disable sort related rules.
   *
   * Applies to all supported languages.
   *
   * @default true
   */
  sort?: boolean

  /**
   * Enable or disable stylistic rules.
   *
   * Applies to all supported languages.
   *
   * @default true
   */
  stylistic?: boolean

  /**
   * Customize quotes, semi, indentation.
   *
   * This option has no effect if `stylistic` is explicitly disabled.
   *
   * @default undefined
   */
  stylisticOptions?: StylisticOptions

  /**
   * Enable or disable TypeScript support.
   *
   * @default Autodetected based on locally installed dependencies.
   */
  ts?: boolean

  /**
   * Enable type aware rules.
   *
   * No type aware rules are enabled by default.
   *
   * This option has no effect if `ts` is explicitly disabled.
   *
   * @default undefined
   *
   */
  tsOptions?: TsOptions

  /**
   * Enable or disable Vue support.
   *
   * @default Autodetected based on locally installed dependencies.
   */
  vue?: boolean

  /**
   * Enable or disable YAML support.
   *
   * @default true
   */
  yml?: boolean
}

interface GitIgnoreOptions {
  /**
   * File or array of files to scan for ignore globs.
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
   * Array of ignore globs to extend or override.
   *
   * @default []
   */
  globs?: string[]

  /**
   * Override the predefined set of excluded globs instead of extending them.
   *
   * @default false
   */
  override?: boolean
}

interface StylisticOptions {
  /**
   * Set default indentation.
   *
   * @default 2
   */
  indent?: number | 'tab'

  /**
   * Enable or disable `jsx-*` stylistic rules.
   *
   * @default true
   */
  jsx?: boolean

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

interface TsOptions {
  /**
   * Path or array of paths to tsconfig files.
   *
   * Check documentation for details.
   *
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[]
}

export type {
  ConfigOptions,
  FlatESLintConfigItem,
  FlatESLintConfigItemExtend,
  GitIgnoreOptions,
  IgnoresOptions,
  StylisticOptions,
  TsOptions,
}
