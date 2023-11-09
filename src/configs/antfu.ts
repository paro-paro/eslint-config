/* eslint perfectionist/sort-objects: error */
import type { Context } from '../setup'
import type { FlatConfigItem } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function antfu(ctx: Context): FlatConfigItem[] {
  const {
    files,
    enableTs,
    enableStylistic,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'config:rules:typescript:antfu'
        : 'config:rules:javascript:antfu',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'antfu/no-import-node-modules-by-path': 'error',

        ...enableTs && {
          'antfu/generic-spacing': 'error',
          'antfu/import-dedupe': 'error',
          'antfu/named-tuple-spacing': 'error',
          'antfu/no-cjs-exports': 'error',
          'antfu/no-const-enum': 'error',
          'antfu/no-ts-export-equal': 'error',
        },

        ...enableStylistic && {
          'antfu/consistent-list-newline': 'error',
          'antfu/if-newline': 'error',
          'antfu/top-level-function': 'error',
        },
      },
    },
  ]
}
