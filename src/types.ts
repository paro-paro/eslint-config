import type { FlatESLintConfigItem } from 'eslint-define-config'

interface FlatESLintConfigItemExtended extends FlatESLintConfigItem {
  name?: string
}

interface OptionsBase {
  files: string[]
}

interface OptionsShared extends OptionsBase {
  enableTs: boolean
  enableStylistic: boolean
  enablePerfectionist: boolean
}

interface OptionsJavascript extends OptionsBase {}
interface OptionsNode extends OptionsBase {}
interface OptionsImports extends OptionsBase {}
interface OptionsUnicorn extends OptionsBase {}
interface OptionsComments extends OptionsBase {}

interface OptionsTypescript {
  isTypeAwareRules?: boolean
}

interface OptionsStylistic {
  jsx?: boolean
  indent?: number | 'tab'
  quotes?: 'single' | 'double'
}

interface OptionsVue {
  enableTs: boolean
  enableStylistic: boolean
  indent?: number | 'tab'
}

interface OptionsJson {
  enableStylistic: boolean
  indent?: number | 'tab'
}

interface OptionsYaml {
  enableStylistic: boolean
  indent?: number | 'tab'
  quotes?: 'single' | 'double'
}

interface OptionsUser {
  ts?: boolean
  vue?: boolean
  json?: boolean
  yaml?: boolean
  markdown?: boolean
  stylistic?: boolean
  perfectionist?: boolean
  tsOptions?: OptionsTypescript
  stylisticOptions?: OptionsStylistic
}

export type {
  FlatESLintConfigItem,
  FlatESLintConfigItemExtended,
  OptionsShared,
  OptionsJavascript,
  OptionsNode,
  OptionsImports,
  OptionsUnicorn,
  OptionsComments,
  OptionsTypescript,
  OptionsStylistic,
  OptionsUser,
  OptionsVue,
  OptionsJson,
  OptionsYaml,
}
