import type { Context } from '../setup'
import type { Config } from '../types'
import { GLOB_YML } from '../globs'

export function yml(ctx: Context): Config[] {
  const {
    enableStylistic,
    stylisticOptions,
  } = ctx

  const {
    indent = 2,
    quotes = 'single',
  } = stylisticOptions

  return [
    {
      files: [GLOB_YML],
      name: 'paroparo:rules:yml',
      rules: {
        'yml/block-mapping': 'error',
        'yml/block-sequence': 'error',
        'yml/no-empty-key': 'error',
        'yml/no-empty-sequence-entry': 'error',
        'yml/no-irregular-whitespace': 'error',
        'yml/plain-scalar': 'error',
        'yml/vue-custom-block/no-parsing-error': 'error',

        ...enableStylistic && {
          'yml/block-mapping-question-indicator-newline': 'error',
          'yml/block-sequence-hyphen-indicator-newline': 'error',
          'yml/flow-mapping-curly-newline': 'error',
          'yml/flow-mapping-curly-spacing': 'error',
          'yml/flow-sequence-bracket-newline': 'error',
          'yml/flow-sequence-bracket-spacing': 'error',
          'yml/indent': ['error', indent === 'tab' ? 2 : indent],
          'yml/key-spacing': 'error',
          'yml/no-tab-indent': 'error',
          'yml/quotes': ['error', { avoidEscape: false, prefer: quotes }],
          'yml/spaced-comment': 'error',
        },
      },
    },
  ]
}
