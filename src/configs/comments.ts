import type { FlatESLintConfigItemExtended } from '../types'

export function comments(files: string[]): FlatESLintConfigItemExtended[] {
  return [
    {
      files,
      name: 'config:comments',
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
