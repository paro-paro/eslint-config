import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function imports(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    files,
    enableTs,
    enableStylistic,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'config:rules:typescript:import'
        : 'config:rules:javascript:import',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',

        ...enableStylistic && {
          'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
        },
      },
    },
  ]
}
