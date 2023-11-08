import { GLOB_JS, GLOB_TS } from './globs'
import { json, overrides, stylistic, typescript, vue, yaml } from './configs'
import { getBaseConfig } from './utils'
import type { FlatESLintConfigItem, OptionsUser } from './types'

export function paroparo(options: OptionsUser = {}, ...userConfigs: FlatESLintConfigItem[]): FlatESLintConfigItem[] {
  const {
    ts: enableTs = true,
    vue: enableVue = true,
    json: enableJson = true,
    yaml: enableYaml = true,
    stylistic: enableStylistic = true,
    perfectionist: enablePerfectionist = false,
  } = options

  const tsOptions = !enableTs ? {} : options.tsOptions ?? {}
  const stylisticOptions = !enableStylistic ? {} : options.stylisticOptions ?? {}

  const files = enableTs ? [...GLOB_TS] : [...GLOB_JS]
  const config = getBaseConfig(files, enableTs, enableStylistic, enablePerfectionist)

  if (enableTs)
    config.push(...typescript(files, tsOptions))

  if (enableStylistic)
    config.push(...stylistic(files, stylisticOptions))

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

  config.push(...overrides(enableTs, enableJson), ...userConfigs)
  return config
}
