/* eslint perfectionist/sort-objects: error */
import type { Context } from '../setup'
import type { FlatConfigItem } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function typescript(ctx: Context): FlatConfigItem[] {
  const {
    files,
    enableRenameRules,
    tsOptions,
  } = ctx

  const tsconfigPath = tsOptions.tsconfigPath
  const prefix = enableRenameRules ? 'ts' : '@typescript-eslint'

  return [
    {
      files,
      name: 'config:rules:typescript:2',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'constructor-super': 'off',
        'getter-return': 'off',
        'no-array-constructor': 'off',
        'no-const-assign': 'off',
        'no-dupe-args': 'off',
        'no-dupe-class-members': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-import-assign': 'off',
        'no-invalid-this': 'off',
        'no-loss-of-precision': 'off',
        'no-new-symbol': 'off',
        'no-obj-calls': 'off',
        'no-redeclare': 'off',
        'no-setter-return': 'off',
        'no-this-before-super': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',

        ...tsconfigPath && {},

        /* strict rules */
        [`${prefix}/ban-ts-comment`]: ['error', { 'ts-ignore': 'allow-with-description' }],
        [`${prefix}/ban-types`]: ['error'],
        [`${prefix}/consistent-type-assertions`]: ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }],
        [`${prefix}/consistent-type-definitions`]: ['error', 'interface'],
        [`${prefix}/consistent-type-imports`]: ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
        [`${prefix}/no-array-constructor`]: 'error',
        [`${prefix}/no-dupe-class-members`]: 'error',
        [`${prefix}/no-duplicate-enum-values`]: 'error',
        [`${prefix}/no-dynamic-delete`]: 'error',
        [`${prefix}/no-extra-non-null-assertion`]: 'error',
        [`${prefix}/no-extraneous-class`]: 'error',
        [`${prefix}/no-import-type-side-effects`]: 'error',
        [`${prefix}/no-invalid-this`]: 'error',
        [`${prefix}/no-invalid-void-type`]: 'error',
        [`${prefix}/no-loss-of-precision`]: 'error',
        [`${prefix}/no-misused-new`]: 'error',
        [`${prefix}/no-namespace`]: 'error',
        [`${prefix}/no-non-null-asserted-nullish-coalescing`]: 'error',
        [`${prefix}/no-non-null-asserted-optional-chain`]: 'error',
        [`${prefix}/no-redeclare`]: 'error',
        [`${prefix}/no-require-imports`]: 'error',
        [`${prefix}/no-this-alias`]: 'error',
        [`${prefix}/no-unnecessary-type-constraint`]: 'error',
        [`${prefix}/no-unsafe-declaration-merging`]: 'error',
        [`${prefix}/no-use-before-define`]: ['error', { classes: false, functions: false, variables: true }],
        [`${prefix}/no-useless-constructor`]: 'error',
        [`${prefix}/no-var-requires`]: 'error',
        [`${prefix}/prefer-as-const`]: 'error',
        [`${prefix}/prefer-literal-enum-member`]: 'error',
        [`${prefix}/prefer-ts-expect-error`]: 'error',
        [`${prefix}/unified-signatures`]: 'error',

        /* type aware rules */
        ...tsconfigPath && {},
      },
    },
  ]
}
