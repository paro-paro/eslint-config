import process from 'node:process'
import globals from 'globals'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_MD, GLOB_VUE, GLOB_YML } from '../globs'
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
  pluginStylistic,
  pluginTs,
  pluginUnicorn,
  pluginUnusedImports,
  pluginVue,
  pluginYml,
} from '../plugins'
import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'

export function install(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    files,
    enableTs,
    enableVue,
    enableJson,
    enableYml,
    enableJsdoc,
    enableMarkdown,
    enableStylistic,
    enablePerfectionist,
    enableGlobals,
    enableRenameRules,
    tsOptions,
  } = ctx

  const install: FlatESLintConfigItemExtend[] = []
  const tsconfigPath = tsOptions.tsconfigPath

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

      ...enableJsdoc && {
        jsdoc: pluginJsdoc,
      },

      ...enableStylistic && {
        [enableRenameRules ? 'stylistic' : '@stylistic']: pluginStylistic,
      },

      ...enablePerfectionist && {
        perfectionist: pluginPerfectionist,
      },
    },
  }

  const js: FlatESLintConfigItemExtend = {
    files,
    name: 'config:install:javascript',
    ...plugins,
    ...linterOptions,

    languageOptions: {
      ...shared,
      ...enableGlobals && supportedGlobals,

      // @ts-expect-error - relax!
      parserOptions: {
        ...shared,
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
      ...shared,
      ...enableGlobals && supportedGlobals,
      parser: parserTs,

      // @ts-expect-error - relax!
      parserOptions: {
        ...shared,
        ecmaFeatures: { jsx: true },
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
    processor: pluginVue.processors['.vue'],
    plugins: {
      vue: pluginVue,
    },
    ...linterOptions,

    languageOptions: {
      ...shared,
      ...supportedGlobals,
      parser: parserVue,

      // @ts-expect-error - relax!
      parserOptions: {
        ...shared,
        ecmaFeatures: { jsx: true },
        parser: enableTs ? parserTs as any : null,
        // vueFeatures: {},
      },
    },
  }

  const json: FlatESLintConfigItemExtend = {
    files: [GLOB_JSON, GLOB_JSONC, GLOB_JSON5],
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
    install.push(ts)
  else
    install.push(js)

  if (enableVue)
    install.push(vue)

  if (enableJson)
    install.push(json)

  if (enableYml)
    install.push(yml)

  if (enableMarkdown)
    install.push(markdown)

  return install
}
