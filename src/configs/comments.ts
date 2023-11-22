import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function comments(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    files,
    enableTs,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'config:rules:typescript:eslint-comments'
        : 'config:rules:javascript:eslint-comments',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
      },
    },
  ]
}
