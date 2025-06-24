import type { Context } from '../setup'
import type { Config } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function imports(ctx: Context): Config[] {
  const {
    files,
    enableTs,
    enableStylistic,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'paroparo:rules:typescript:import'
        : 'paroparo:rules:javascript:import',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',

        ...enableStylistic && {
          'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
        },
      },
    },
  ]
}
