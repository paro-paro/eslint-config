import { parserTs } from '../parsers'
import { pluginTs } from '../plugins'
import type { FlatESLintConfigItemExtended, TsOptions } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function typescript(files: string[], _options: TsOptions): FlatESLintConfigItemExtended[] {
  return [
    {
      files,
      name: 'config:typescript',

      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: 'module',
        },
      },

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        ...pluginTs.configs['eslint-recommended'].overrides![0].rules,
        ...pluginTs.configs.strict.rules,

        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/ban-types': ['error', { types: { Function: false } }],
        '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        '@typescript-eslint/prefer-as-const': 'warn',
        '@typescript-eslint/triple-slash-reference': 'off',

        'antfu/generic-spacing': 'error',
        'antfu/import-dedupe': 'error',
        'antfu/named-tuple-spacing': 'error',
        'antfu/no-cjs-exports': 'error',
        'antfu/no-const-enum': 'error',

        'no-invalid-this': 'off',
        'no-use-before-define': 'off',
      },
    },
  ]
}
