/* eslint perfectionist/sort-objects: error */
import {
  GLOB_DTS,
  GLOB_MD_CODE_JS,
  GLOB_MD_CODE_TS,
  GLOB_SCRIPTS_JS,
  GLOB_SCRIPTS_TS,
  GLOB_TEST_JS,
  GLOB_TEST_TS,
} from '../globs'
import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'
import { sortPackageJson, sortTsConfig } from './sort'

/* eslint-disable perfectionist/sort-objects */
export function overrides(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    enableTs = true,
    enableJson = true,
    enableStylistic = true,
    enableMarkdown = true,
    enableSort = true,
    enableRenameRules = true,
  } = ctx

  const overrides: FlatESLintConfigItemExtend[] = []
  const prefixTs = enableRenameRules ? 'ts' : '@typescript-eslint'
  const prefixStylistic = enableRenameRules ? 'stylistic' : '@stylistic'

  /* eslint-enable perfectionist/sort-objects */
  const tests: FlatESLintConfigItemExtend = {
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

  const scripts: FlatESLintConfigItemExtend = {
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

  const dts: FlatESLintConfigItemExtend = {
    files: [...GLOB_DTS],
    name: 'config:overrides:typescript:dts',
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  }

  const markdownCode: FlatESLintConfigItemExtend = {
    files: enableTs
      ? [...GLOB_MD_CODE_TS]
      : [...GLOB_MD_CODE_JS],

    name: enableTs
      ? 'config:overrides:typescript:markdown'
      : 'config:overrides:javascript:markdown',

    rules: {
      ...{
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',
      },

      ...{
        'no-alert': 'off',
        'no-console': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-use-before-define': 'off',
        'unicode-bom': 'off',
      },

      ...{
        'node/prefer-global/buffer': 'off',
        'node/prefer-global/process': 'off',
      },

      ...{
        'antfu/no-cjs-exports': 'off',
        'antfu/no-ts-export-equal': 'off',
      },

      ...enableTs && {
        [`${prefixTs}/consistent-type-imports`]: 'off',
        [`${prefixTs}/no-namespace`]: 'off',
        [`${prefixTs}/no-require-imports`]: 'off',
        [`${prefixTs}/no-use-before-define`]: 'off',
        [`${prefixTs}/no-var-requires`]: 'off',
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

  overrides.push(tests, scripts)

  if (enableMarkdown)
    overrides.push(markdownCode)

  if (enableTs)
    overrides.push(dts)

  if (enableJson && enableSort)
    overrides.push(sortPackageJson, sortTsConfig)

  return overrides
}
