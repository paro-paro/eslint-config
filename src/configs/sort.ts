/* eslint perfectionist/sort-objects: error */
import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function sort(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    files,
    enableTs,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'config:rules:typescript:sort'
        : 'config:rules:javascript:sort',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        ...{
          'perfectionist/sort-imports': [
            'error',
            {
              'groups': [
                ['builtin-type', 'external-type'],
                ['internal-type', 'parent-type', 'sibling-type', 'index-type'],
                ['builtin', 'external'],
                ['internal', 'parent', 'sibling', 'index'],
                ['side-effect', 'side-effect-style', 'style', 'object', 'unknown'],
              ],
              'ignore-case': true,
              'newlines-between': 'never',
              'order': 'asc',
              'type': 'natural',
            },
          ],
          'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
        },

        ...{
          'sort-exports/sort-exports': [
            'error',
            {
              ignoreCase: true,
              sortDir: 'asc',
              sortExportKindFirst: 'type',
            },
          ],
        },
      },
    },
  ]
}
