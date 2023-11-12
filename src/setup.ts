import { GLOB_JS, GLOB_TS, GLOB_VUE } from './globs'
import { autoDetectTs, autoDetectVue } from './utils'
import { getPreset } from './preset'
import type {
  ConfigOptions,
  FlatESLintConfigItem,
  GitIgnoreOptions,
  IgnoresOptions,
  StylisticOptions,
  TsOptions,
} from './types'

export interface Context {
  files: string[]
  enableTs: boolean
  enableVue: boolean
  enableJson: boolean
  enableYml: boolean
  enableMarkdown: boolean
  enableJsdoc: boolean
  enableStylistic: boolean
  enablePerfectionist: boolean
  enableGlobals: boolean
  enableRenameRules: boolean
  gitignoreOptions: false | GitIgnoreOptions
  ignoresOptions: false | IgnoresOptions
  tsOptions: TsOptions
  stylisticOptions: StylisticOptions
}

export function paroparo(options: ConfigOptions = {}, ...userConfigs: FlatESLintConfigItem[]): FlatESLintConfigItem[] {
  const {
    ts: enableTs = autoDetectTs(),
    vue: enableVue = autoDetectVue(),
    json: enableJson = true,
    yml: enableYml = true,
    markdown: enableMarkdown = true,
    jsdoc: enableJsdoc = true,
    stylistic: enableStylistic = true,
    perfectionist: enablePerfectionist = true,
    globals: enableGlobals = true,
    renameRules: enableRenameRules = true,
  } = options

  const ctx: Context = {
    files:
      enableTs
        ? enableVue ? [...GLOB_TS, GLOB_VUE] : [...GLOB_TS]
        : enableVue ? [...GLOB_JS, GLOB_VUE] : [...GLOB_JS],

    enableTs,
    enableVue,
    enableJson,
    enableYml,
    enableMarkdown,
    enableJsdoc,
    enableStylistic,
    enablePerfectionist,
    enableGlobals,
    enableRenameRules,

    gitignoreOptions:
      options.gitignore === false
        ? false
        : typeof options.gitignore === 'object'
          ? options.gitignore
          : {},

    ignoresOptions:
      options.ignores === false
        ? false
        : typeof options.ignores === 'object'
          ? options.ignores
          : {},

    tsOptions:
      !enableTs
        ? {}
        : options.tsOptions ?? {},

    stylisticOptions:
      !enableStylistic
        ? {}
        : options.stylisticOptions ?? {},
  }

  const preset = getPreset(ctx)
  preset.push(...userConfigs)

  return preset
}
