/* eslint-disable perfectionist/sort-objects */
import { parserTs } from '../parsers'
import { pluginTs } from '../plugins'
import type { FlatESLintConfigItemExtended, OptionsTypescript } from '../types'

export function typescript(files: string[], _options: OptionsTypescript): FlatESLintConfigItemExtended[] {
  return [
    {
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: 'module',
        },
      },
      name: 'config:typescript',
      rules: {
        /* disable eslint rules */
        'no-invalid-this': 'off',
        'no-use-before-define': 'off',
        ...pluginTs.configs['eslint-recommended'].overrides![0].rules,

        /* add strict rules */
        ...pluginTs.configs.strict.rules,
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-redeclare': 'error',

        /* override strict rules */
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/ban-types': ['error', { types: { Function: false } }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/prefer-as-const': 'warn',
        '@typescript-eslint/triple-slash-reference': 'off',

        /* add extra rules */
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
        '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }],

        /* antfu */
        'antfu/import-dedupe': 'error', // only works with parserTs
        'antfu/no-const-enum': 'error',
        'antfu/no-cjs-exports': 'error',
        'antfu/generic-spacing': 'error',
        'antfu/named-tuple-spacing': 'error',
      },
    },
  ]
}
