import { GLOB_JS, GLOB_TS } from './globs'
import { jsdoc, json, markdown, overrides, stylistic, typescript, vue, yaml } from './configs'
import { autoDetectTs, autoDetectVue, getBaseConfig } from './utils'
import type { ConfigOptions, FlatESLintConfigItem } from './types'

export function paroparo(options: ConfigOptions = {}, ...userConfigs: FlatESLintConfigItem[]): FlatESLintConfigItem[] {
  const {
    ts: enableTs = autoDetectTs(),
    vue: enableVue = autoDetectVue(),
    json: enableJson = true,
    yaml: enableYaml = true,
    jsdoc: enableJsdoc = true,
    markdown: enableMarkdown = true,
    perfectionist: enablePerfectionist = true,
    stylistic: enableStylistic = true,
  } = options

  const files = enableTs ? [...GLOB_TS] : [...GLOB_JS]
  const extendIgnores = options.extendIgnores ?? []

  const config = getBaseConfig({
    files,
    enableTs,
    enableJsdoc,
    enablePerfectionist,
    enableStylistic,
    extendIgnores,
  })

  const tsOptions = !enableTs ? {} : options.tsOptions ?? {}
  const stylisticOptions = !enableStylistic ? {} : options.stylisticOptions ?? {}

  if (enableJsdoc)
    config.push(...jsdoc(files, enableStylistic))

  if (enableStylistic)
    config.push(...stylistic(files, stylisticOptions))

  if (enableTs)
    config.push(...typescript(files, tsOptions))

  if (enableVue) {
    config.push(...vue({
      enableTs,
      enableStylistic,
      indent: stylisticOptions.indent,
    }))
  }

  if (enableJson) {
    config.push(...json({
      enableStylistic,
      indent: stylisticOptions.indent,
    }))
  }

  if (enableYaml) {
    config.push(...yaml({
      enableStylistic,
      indent: stylisticOptions.indent,
      quotes: stylisticOptions.quotes,
    }))
  }

  if (enableMarkdown)
    config.push(...markdown())

  config.push(...overrides(enableTs, enableJson), ...userConfigs)
  return config
}
