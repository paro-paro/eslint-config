import type { Context } from '../setup'
import type { Config } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function comments(ctx: Context): Config[] {
  const {
    files,
    enableTs,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'paroparo:rules:typescript:eslint-comments'
        : 'paroparo:rules:javascript:eslint-comments',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        'eslint-comments/no-unlimited-disable': 'off',
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
      },
    },
  ]
}
