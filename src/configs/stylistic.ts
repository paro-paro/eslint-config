import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'
import { GLOB_JSON, GLOB_YML } from '../globs'
import { pluginStylistic } from '../plugins'

/* eslint-disable perfectionist/sort-objects */
export function stylistic(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    files,
    enableRenameRules,
    stylisticOptions,
  } = ctx

  const {
    jsx = true,
    indent = 2,
    quotes = 'single',
    semi = false,
  } = stylisticOptions

  const pluginName = enableRenameRules ? 'stylistic' : '@stylistic'
  const config = pluginStylistic.configs.customize({
    flat: true,
    pluginName,
    jsx,
    indent,
    quotes,
    semi,
  })

  return [
    {
      files: [...files, GLOB_JSON, GLOB_YML],
      name: 'config:rules:stylistic',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        ...config.rules,
      },
    },
  ]
}
