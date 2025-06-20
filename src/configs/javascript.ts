import type { Context } from '../setup'
import type { Config } from '../types'
import configJs from '@eslint/js'

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
        ? 'config:rules:typescript:1'
        : 'config:rules:javascript',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        ...configJs.configs.recommended.rules,
        'no-unused-vars': 'off',
        ...enableStylistic && {
          curly: ['error', 'multi-or-nest', 'consistent'],
        },
      },
    },
  ]
}
