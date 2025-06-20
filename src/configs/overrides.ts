import type { Context } from '../setup'
import type { Config } from '../types'
import {
  GLOB_DTS,
  GLOB_MD_JS,
  GLOB_MD_TS,
  GLOB_SCRIPTS_JS,
  GLOB_SCRIPTS_TS,
  GLOB_TEST_JS,
  GLOB_TEST_TS,
} from '../globs'

/* eslint-disable perfectionist/sort-objects */
export function overrides(ctx: Context): Config[] {
  const config: Config[] = []

  const {
    enableTs,
    enableSort,
    enableMarkdown,
    enableStylistic,
    enableRenameRules,
  } = ctx

  const prefixTs = enableRenameRules ? 'ts' : '@typescript-eslint'
  const prefixStylistic = enableRenameRules ? 'stylistic' : '@stylistic'

  /* eslint-enable perfectionist/sort-objects */
  const tests: Config = {
    files: enableTs
      ? [...GLOB_TEST_TS]
      : [...GLOB_TEST_JS],

    name: enableTs
      ? 'config:overrides:typescript:tests'
      : 'config:overrides:javascript:tests',

    rules: {
      'no-unused-expressions': 'off',
    },
  }

  const scripts: Config = {
    files: enableTs
      ? [...GLOB_SCRIPTS_TS]
      : [...GLOB_SCRIPTS_JS],

    name: enableTs
      ? 'config:overrides:typescript:scripts'
      : 'config:overrides:javascript:scripts',

    rules: {
      'no-console': 'off',
    },
  }

  const dts: Config = {
    files: [...GLOB_DTS],
    name: 'config:overrides:typescript:dts',
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  }

  const markdownCode: Config = {
    files: enableTs
      ? [...GLOB_MD_TS]
      : [...GLOB_MD_JS],

    name: enableTs
      ? 'config:overrides:typescript:markdown'
      : 'config:overrides:javascript:markdown',

    rules: {
      ...{
        'no-alert': 'off',
        'no-console': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-use-before-define': 'off',
        'unicode-bom': 'off',
      },

      ...enableTs && {
        [`${prefixTs}/consistent-type-imports`]: 'off',
        [`${prefixTs}/no-namespace`]: 'off',
        [`${prefixTs}/no-require-imports`]: 'off',
        [`${prefixTs}/no-use-before-define`]: 'off',
      },

      ...{
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',
      },

      ...{
        'antfu/no-cjs-exports': 'off',
        'antfu/no-ts-export-equal': 'off',
      },

      ...{
        'node/prefer-global/buffer': 'off',
        'node/prefer-global/process': 'off',
      },

      ...enableSort && {
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-named-imports': 'off',
        'sort-exports/sort-exports': 'off',
      },

      ...enableStylistic && {
        [`${prefixStylistic}/eol-last`]: 'off',
      },
    },

    /* eslint-disable-next-line perfectionist/sort-objects */
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
  }

  config.push(tests, scripts)

  if (enableTs)
    config.push(dts)

  if (enableMarkdown)
    config.push(markdownCode)

  return config
}
