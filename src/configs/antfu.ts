import type { Context } from '../setup'
import type { Config } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function antfu(ctx: Context): Config[] {
  const {
    files,
    enableTs,
    enableStylistic,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'paroparo:rules:typescript:antfu'
        : 'paroparo:rules:javascript:antfu',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        ...enableTs && {
          'antfu/import-dedupe': 'error',
        },

        ...enableStylistic && {
          'antfu/consistent-list-newline': 'error',
          'antfu/if-newline': 'error',
        },
      },
    },
  ]
}
