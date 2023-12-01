import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'
import { pluginStylistic } from '../plugins'

/* eslint-disable perfectionist/sort-objects */
export function stylistic(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    filesStylistic,
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
      files: filesStylistic,
      name: 'config:rules:stylistic',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        ...config.rules,
      },
    },
  ]
}
