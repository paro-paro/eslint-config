import type { Context } from '../setup'
import type { Config } from '../types'
import eslintJs from '@eslint/js'

/* eslint-disable perfectionist/sort-objects */
export function javascript(ctx: Context): Config[] {
  const {
    files,
    enableTs,
    enableStylistic,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'paroparo:rules:typescript:1'
        : 'paroparo:rules:javascript',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        ...eslintJs.configs.recommended.rules,
        'no-unused-vars': 'off',
        ...enableStylistic && {
          curly: ['error', 'multi-or-nest', 'consistent'],
        },
      },
    },
  ]
}
