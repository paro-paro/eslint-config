import type { FlatESLintConfigItem } from 'eslint-define-config'

interface FlatESLintConfigItemExtended extends FlatESLintConfigItem {
  name?: string
}

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

interface TsOptions {
  isTypeAwareRules?: boolean
}

interface StylisticOptions {
  jsx?: boolean
  indent?: number | 'tab'
  quotes?: 'single' | 'double'
}

type ExtendIgnores = string[] | {
  globs: string[]
  override?: boolean
}

export type {
  FlatESLintConfigItem,
  FlatESLintConfigItemExtended,
  ConfigOptions,
  TsOptions,
  StylisticOptions,
  ExtendIgnores,
}
