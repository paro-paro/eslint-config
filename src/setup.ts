import type {
  ConfigOptions,
  FlatESLintConfigItem,
  GitIgnoreOptions,
  IgnoresOptions,
  StylisticOptions,
  TsOptions,
} from './types'
import { GLOB_JS, GLOB_TS, GLOB_VUE } from './globs'
import { getPreset } from './preset'
import { autoDetectTs, autoDetectVue } from './utils'

interface Context {
  files: string[]
  enableTs: boolean
  enableVue: boolean
  enableJson: boolean
  enableYml: boolean
  enableMarkdown: boolean
  enableJsdoc: boolean
  enableSort: boolean
  enableStylistic: boolean
  enableGlobals: boolean
  enableRenameRules: boolean
  tsOptions: TsOptions
  stylisticOptions: StylisticOptions
  ignoresOptions: false | IgnoresOptions
  gitignoreOptions: false | GitIgnoreOptions
}

function paroparo(options: ConfigOptions = {}, ...userConfigs: FlatESLintConfigItem[]): FlatESLintConfigItem[] {
  const {
    ts: enableTs = autoDetectTs(),
    vue: enableVue = autoDetectVue(),
    json: enableJson = true,
    yml: enableYml = true,
    markdown: enableMarkdown = true,
    jsdoc: enableJsdoc = true,
    sort: enableSort = true,
    stylistic: enableStylistic = true,
    globals: enableGlobals = true,
    renameRules: enableRenameRules = true,
  } = options

  const files
    = enableTs
      ? enableVue ? [...GLOB_TS, GLOB_VUE] : [...GLOB_TS]
      : enableVue ? [...GLOB_JS, GLOB_VUE] : [...GLOB_JS]

  const tsOptions
    = !enableTs
      ? {}
      : options.tsOptions ?? {}

  const stylisticOptions
    = !enableStylistic
      ? {}
      : options.stylisticOptions ?? {}

  const ignoresOptions
    = options.ignores === false
      ? false
      : typeof options.ignores === 'object'
        ? options.ignores
        : {}

  const gitignoreOptions
    = options.gitignore === false
      ? false
      : typeof options.gitignore === 'object'
        ? options.gitignore
        : {}

  const ctx: Context = {
    files,
    enableTs,
    enableVue,
    enableJson,
    enableYml,
    enableMarkdown,
    enableJsdoc,
    enableSort,
    enableStylistic,
    enableGlobals,
    enableRenameRules,
    tsOptions,
    stylisticOptions,
    ignoresOptions,
    gitignoreOptions,
  }

  const preset = getPreset(ctx)
  preset.push(...userConfigs)

  return preset
}

export type { Context }
export { paroparo }
