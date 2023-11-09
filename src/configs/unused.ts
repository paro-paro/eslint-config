/* eslint perfectionist/sort-objects: error */
import type { Context } from '../setup'
import type { FlatConfigItem } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function unused(ctx: Context): FlatConfigItem[] {
  const {
    files,
    enableTs,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'config:rules:typescript:unused-imports'
        : 'config:rules:javascript:unused-imports',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
  ]
}
