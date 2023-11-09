/* eslint perfectionist/sort-objects: error */
import type { Context } from '../setup'
import type { FlatConfigItem } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function jsdoc(ctx: Context): FlatConfigItem[] {
  const {
    files,
    enableTs,
    enableStylistic,
  } = ctx

  return [
    {
      files,
      name: enableTs
        ? 'config:rules:typescript:jsdoc'
        : 'config:rules:javascript:jsdoc',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/no-defaults': 'warn',
        'jsdoc/no-multi-asterisks': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-yields-check': 'warn',

        ...enableStylistic && {
          'jsdoc/check-alignment': 'warn',
          'jsdoc/multiline-blocks': 'warn',
        },
      },
    },
  ]
}
