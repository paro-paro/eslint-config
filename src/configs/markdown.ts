import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE_BLOCK } from '../globs'
import { pluginMarkdown } from '../plugins'
import type { FlatESLintConfigItemExtended } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function markdown(): FlatESLintConfigItemExtended[] {
  return [
    {
      files: [GLOB_MARKDOWN],
      name: 'config:markdown',

      plugins: {
        markdown: pluginMarkdown,
      },

      processor: 'markdown/markdown',
    },

    {
      files: [...GLOB_MARKDOWN_CODE_BLOCK],
      name: 'config:markdown:code',

      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        '@stylistic/comma-dangle': 'off',
        '@stylistic/eol-last': 'off',

        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',

        'antfu/no-cjs-exports': 'off',
        'antfu/no-ts-export-equal': 'off',

        'import/newline-after-import': 'off',

        'no-alert': 'off',
        'no-console': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'node/prefer-global/process': 'off',

        'unicode-bom': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',

        /* type aware rules */
        ...{
          '@typescript-eslint/await-thenable': 'off',
          '@typescript-eslint/dot-notation': 'off',
          '@typescript-eslint/no-floating-promises': 'off',
          '@typescript-eslint/no-for-in-array': 'off',
          '@typescript-eslint/no-implied-eval': 'off',
          '@typescript-eslint/no-misused-promises': 'off',
          '@typescript-eslint/no-throw-literal': 'off',
          '@typescript-eslint/no-unnecessary-type-assertion': 'off',
          '@typescript-eslint/no-unsafe-argument': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
          '@typescript-eslint/no-unsafe-return': 'off',
          '@typescript-eslint/restrict-plus-operands': 'off',
          '@typescript-eslint/restrict-template-expressions': 'off',
          '@typescript-eslint/unbound-method': 'off',
        },
      },
    },
  ]
}
