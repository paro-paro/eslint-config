/* eslint-disable perfectionist/sort-objects */
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

  const linterOptions = {
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
  }

  const shared = {
    ecmaVersion: 'latest',
    sourceType: 'module',
  }

  const supportedGlobals = {
    globals: {
      ...globals.node,
      ...globals.browser,
      ...globals.es2021,
    },
  }

  const plugins = {
    plugins: {
      ...enableTs && {
        [enableRenameRules ? 'ts' : '@typescript-eslint']: pluginTs,
      },

      'unused-imports': pluginUnusedImports,
      'antfu': pluginAntfu,
      'import': pluginImport,
      'node': pluginNode,
      'unicorn': pluginUnicorn,
      'eslint-comments': pluginComments,
      'sort-exports': pluginSortExports,
      'perfectionist': pluginPerfectionist,

      ...enableStylistic && {
        [enableRenameRules ? 'stylistic' : '@stylistic']: pluginStylistic,
      },
    },
  }

  const js: FlatESLintConfigItemExtend = {
    files,
    name: 'config:install:javascript',
    ...plugins,
    ...linterOptions,

    languageOptions: {
      ...shared as any,
      ...enableGlobals && supportedGlobals,

      parserOptions: {
        ...shared as any,
        ecmaFeatures: { jsx: true },
      },
    },
  }

  const ts: FlatESLintConfigItemExtend = {
    files,
    name: 'config:install:typescript',
    ...plugins,
    ...linterOptions,

    languageOptions: {
      parser: parserTs,
      ...shared as any,
      ...enableGlobals && supportedGlobals,

      parserOptions: {
        ...shared as any,
        ecmaFeatures: { jsx: true },

        ...tsconfigPath && {
          project: tsconfigPath,
          tsconfigRootDir: process.cwd(),
        },

        extraFileExtensions: enableVue ? ['.vue'] : [],
      },
    },
  }

  const vue: FlatESLintConfigItemExtend = {
    files: [GLOB_VUE],
    name: 'config:install:vue',
    processor: pluginVue.processors['.vue'],
    plugins: {
      vue: pluginVue,
    },
    ...linterOptions,

    languageOptions: {
      parser: parserVue,
      ...shared as any,
      ...enableGlobals && supportedGlobals,

      parserOptions: {
        ...shared as any,
        ecmaFeatures: { jsx: true },
        parser: enableTs ? parserTs as any : null,
      },
    },
  }

  const json: FlatESLintConfigItemExtend = {
    files: [GLOB_JSON],
    name: 'config:install:jsonc',
    plugins: {
      jsonc: pluginJsonc,
    },
    languageOptions: {
      parser: parserJsonc,
    },
  }

  const yml: FlatESLintConfigItemExtend = {
    files: [GLOB_YML],
    name: 'config:install:yml',
    plugins: {
      yml: pluginYml,
    },
    languageOptions: {
      parser: parserYml,
    },
  }

  const markdown: FlatESLintConfigItemExtend = {
    files: [GLOB_MD],
    name: 'config:install:markdown',
    processor: 'markdown/markdown',
    plugins: {
      markdown: pluginMarkdown,
    },
  }

  if (enableTs)
    config.push(ts)
  else
    config.push(js)

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
