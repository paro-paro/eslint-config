import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'
import process from 'node:process'
import globals from 'globals'
import { GLOB_JSON, GLOB_MD, GLOB_VUE, GLOB_YML } from '../globs'
import { parserJsonc, parserTs, parserVue, parserYml } from '../parsers'
import {
  pluginAntfu,
  pluginComments,
  pluginImport,
  pluginJsdoc,
  pluginJsonc,
  pluginMarkdown,
  pluginNode,
  pluginPerfectionist,
  pluginSortExports,
  pluginStylistic,
  pluginTs,
  pluginUnicorn,
  pluginUnusedImports,
  pluginVue,
  pluginYml,
} from '../plugins'

const LINTER_OPTIONS = {
  linterOptions: {
    noInlineConfig: false,
    reportUnusedDisableDirectives: true,
  },
}

const ECMAVERSION_SOURCETYPE = {
  ecmaVersion: 'latest',
  sourceType: 'module',
}

const ECMAFEATURES = {
  ecmaFeatures: {
    jsx: true,
  },
}

const SUPPORTED_GLOBALS = {
  globals: {
    ...globals.node,
    ...globals.browser,
    ...globals.es2021,
  },
}

/* eslint-disable perfectionist/sort-objects */
export function install(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    files,
    enableTs,
    enableVue,
    enableJson,
    enableYml,
    enableMarkdown,
    enableStylistic,
    enableGlobals,
    enableRenameRules,
    tsOptions,
  } = ctx

  const tsconfigPath = tsOptions.tsconfigPath
  const config: FlatESLintConfigItemExtend[] = []

  /* eslint-enable perfectionist/sort-objects */
  const plugins = {
    plugins: {
      'antfu': pluginAntfu,
      'eslint-comments': pluginComments,
      'import': pluginImport,
      'jsdoc': pluginJsdoc,
      'node': pluginNode,
      'perfectionist': pluginPerfectionist,
      'sort-exports': pluginSortExports,
      'unicorn': pluginUnicorn,
      'unused-imports': pluginUnusedImports,

      ...enableTs && {
        [enableRenameRules ? 'ts' : '@typescript-eslint']: pluginTs,
      },
    },
  }

  /* eslint-disable-next-line eslint-comments/disable-enable-pair */
  /* eslint-disable perfectionist/sort-objects */
  const stylistic: FlatESLintConfigItemExtend = {
    files: [...files, GLOB_JSON, GLOB_YML],
    name: 'config:install:stylistic',
    plugins: {
      [enableRenameRules ? 'stylistic' : '@stylistic']: pluginStylistic,
    },
  }

  const js: FlatESLintConfigItemExtend = {
    files,
    name: 'config:install:javascript',
    ...LINTER_OPTIONS,
    ...plugins,

    languageOptions: {
      // parser: 'espree', // default
      ...ECMAVERSION_SOURCETYPE as any,
      ...enableGlobals && SUPPORTED_GLOBALS,

      parserOptions: {
        ...ECMAVERSION_SOURCETYPE,
        ...ECMAFEATURES,
      },
    },
  }

  const ts: FlatESLintConfigItemExtend = {
    files,
    name: 'config:install:typescript',
    ...LINTER_OPTIONS,
    ...plugins,

    languageOptions: {
      parser: parserTs,
      ...ECMAVERSION_SOURCETYPE as any,
      ...enableGlobals && SUPPORTED_GLOBALS,

      parserOptions: {
        ...ECMAVERSION_SOURCETYPE,
        ...ECMAFEATURES,

        // typescript-specific
        extraFileExtensions: enableVue ? ['.vue'] : [],
        ...tsconfigPath && {
          project: tsconfigPath,
          tsconfigRootDir: process.cwd(),
        },
      },
    },
  }

  const vue: FlatESLintConfigItemExtend = {
    files: [GLOB_VUE],
    name: 'config:install:vue',
    ...LINTER_OPTIONS,
    plugins: { vue: pluginVue },
    processor: pluginVue.processors['.vue'],

    languageOptions: {
      parser: parserVue,
      ...ECMAVERSION_SOURCETYPE as any,
      ...enableGlobals && SUPPORTED_GLOBALS,

      parserOptions: {
        ...ECMAVERSION_SOURCETYPE,
        ...ECMAFEATURES,

        // vue-specific
        parser: {
          js: enableTs ? parserTs : null, // espree if not ts
          ts: enableTs ? parserTs : null,
        },
      },
    },
  }

  const json: FlatESLintConfigItemExtend = {
    files: [GLOB_JSON],
    name: 'config:install:jsonc',
    plugins: { jsonc: pluginJsonc },
    languageOptions: { parser: parserJsonc },
  }

  const yml: FlatESLintConfigItemExtend = {
    files: [GLOB_YML],
    name: 'config:install:yml',
    plugins: { yml: pluginYml },
    languageOptions: { parser: parserYml },
  }

  const markdown: FlatESLintConfigItemExtend = {
    files: [GLOB_MD],
    name: 'config:install:markdown',
    plugins: { markdown: pluginMarkdown },
    processor: 'markdown/markdown',
  }

  if (enableTs)
    config.push(ts)
  else
    config.push(js)

  if (enableStylistic)
    config.push(stylistic)

  if (enableVue)
    config.push(vue)

  if (enableJson)
    config.push(json)

  if (enableYml)
    config.push(yml)

  if (enableMarkdown)
    config.push(markdown)

  return config
}
