import type { Config, ConfigOptions, GitIgnoreOptions, IgnoresOptions, StylisticOptions, TsOptions } from './types'
import { GLOB_JS, GLOB_JSON, GLOB_TS, GLOB_VUE, GLOB_YML } from './globs'
import { getPreset } from './preset'
import { autoDetectTs, autoDetectVue } from './utils'

interface Context {
  files: string[]
  filesStylistic: string[]
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
  ignoresOptions: IgnoresOptions | false
  gitignoreOptions: GitIgnoreOptions | false
}

async function paroparo(options: ConfigOptions = {}, ...userConfigs: Config[]): Promise<Config[]> {
  const {
    yml: enableYml = true,
    json: enableJson = true,
    sort: enableSort = true,
    jsdoc: enableJsdoc = true,
    globals: enableGlobals = true,
    markdown: enableMarkdown = true,
    stylistic: enableStylistic = true,
    renameRules: enableRenameRules = true,
    ts: enableTs = autoDetectTs(),
    vue: enableVue = autoDetectVue(),
  } = options

  const files
    = enableTs
      ? enableVue ? [...GLOB_TS, GLOB_VUE] : [...GLOB_TS]
      : enableVue ? [...GLOB_JS, GLOB_VUE] : [...GLOB_JS]

  const filesStylistic = [...files]

  if (enableJson)
    filesStylistic.push(GLOB_JSON)

  if (enableYml)
    filesStylistic.push(GLOB_YML)

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
    = options.gitignore === true
      ? {}
      : typeof options.gitignore === 'object'
        ? options.gitignore
        : false

  const ctx: Context = {
    files,
    filesStylistic,
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

  const preset = await getPreset(ctx)
  preset.push(...userConfigs)
  return preset
}

export type { Context }
export default paroparo
