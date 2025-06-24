import type { Context } from '../setup'
import type { Config } from '../types'
import process from 'node:process'
import globals from 'globals'
import { GLOB_JSON, GLOB_MD, GLOB_VUE, GLOB_YML } from '../globs'
import {
  pluginAntfu,
  pluginComments,
  pluginImport,
  pluginJsdoc,
  pluginNode,
  pluginPerfectionist,
  pluginStylistic,
  pluginUnicorn,
  pluginUnusedImports,
} from '../plugins'
import { interopDefaultAsync } from '../utils'

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

const PLUGINS = {
  plugins: {
    'antfu': pluginAntfu,
    'eslint-comments': pluginComments,
    'import': pluginImport,
    'jsdoc': pluginJsdoc,
    'node': pluginNode,
    'perfectionist': pluginPerfectionist,
    'unicorn': pluginUnicorn,
    'unused-imports': pluginUnusedImports,
  },
}

/* eslint-disable-next-line eslint-comments/disable-enable-pair */
/* eslint-disable perfectionist/sort-objects */
export async function install(ctx: Context): Promise<Config[]> {
  const {
    files,
    filesStylistic,
    enableTs,
    enableVue,
    enableJson,
    enableYml,
    enableMarkdown,
    enableGlobals,
    enableRenameRules,
    tsOptions,
  } = ctx

  const config: Config[] = []
  const tsconfigPath = tsOptions.tsconfigPath

  const prefixTs = enableRenameRules ? 'ts' : '@typescript-eslint'
  const prefixStylistic = enableRenameRules ? 'stylistic' : '@stylistic'

  const stylistic: Config = {
    files: filesStylistic,
    name: 'paroparo:install:stylistic',
    plugins: {
      [prefixStylistic]: pluginStylistic,
    },
  }

  if (!enableTs) {
    config.push({
      files,
      name: 'paroparo:install:javascript',
      ...LINTER_OPTIONS,
      ...PLUGINS,

      languageOptions: {
        ...ECMAVERSION_SOURCETYPE as any,
        ...enableGlobals && SUPPORTED_GLOBALS,

        parserOptions: {
          ...ECMAVERSION_SOURCETYPE,
          ...ECMAFEATURES,
        },
      },
    })
  }

  if (enableTs) {
    const [
      pluginTs,
      parserTs,
    ] = await Promise.all([
      interopDefaultAsync(import('@typescript-eslint/eslint-plugin')),
      interopDefaultAsync(import('@typescript-eslint/parser')),
    ])

    const plugins = Object.assign({}, PLUGINS.plugins, { [prefixTs]: pluginTs })
    config.push({
      files,
      name: 'paroparo:install:typescript',
      ...LINTER_OPTIONS,
      plugins: { ...plugins },

      languageOptions: {
        parser: parserTs,
        ...ECMAVERSION_SOURCETYPE as any,
        ...enableGlobals && SUPPORTED_GLOBALS,

        parserOptions: {
          ...ECMAVERSION_SOURCETYPE,
          ...ECMAFEATURES,

          // ts-specific
          extraFileExtensions: enableVue ? ['.vue'] : [],
          ...tsconfigPath && {
            project: tsconfigPath,
            tsconfigRootDir: process.cwd(),
          },
        },
      },
    })
  }

  if (enableVue) {
    let scriptBlockParser = null // when null, espree is used
    if (enableTs)
      scriptBlockParser = await interopDefaultAsync(import('@typescript-eslint/parser'))

    const [
      pluginVue,
      parserVue,
    ] = await Promise.all([
      interopDefaultAsync(import('eslint-plugin-vue')),
      interopDefaultAsync(import('vue-eslint-parser')),
    ])

    config.push({
      files: [GLOB_VUE],
      name: 'paroparo:install:vue',
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
            js: scriptBlockParser,
            ts: scriptBlockParser,
          },
        },
      },
    })
  }

  if (enableJson) {
    const [
      pluginJsonc,
      parserJsonc,
    ] = await Promise.all([
      interopDefaultAsync(import('eslint-plugin-jsonc')),
      interopDefaultAsync(import('jsonc-eslint-parser')),
    ])

    config.push({
      files: [GLOB_JSON],
      name: 'paroparo:install:jsonc',
      plugins: {
        jsonc: pluginJsonc,
      },
      languageOptions: {
        parser: parserJsonc,
      },
    })
  }

  if (enableYml) {
    const [
      pluginYml,
      parserYml,
    ] = await Promise.all([
      interopDefaultAsync(import('eslint-plugin-yml')),
      interopDefaultAsync(import('yaml-eslint-parser')),
    ])

    config.push({
      files: [GLOB_YML],
      name: 'paroparo:install:yml',
      plugins: { yml: pluginYml },
      languageOptions: { parser: parserYml },
    })
  }

  if (enableMarkdown) {
    // @ts-expect-error: no types
    const pluginMarkdown = await interopDefaultAsync(import('eslint-plugin-markdown'))

    config.push({
      files: [GLOB_MD],
      name: 'paroparo:install:markdown',
      plugins: { markdown: pluginMarkdown },
      processor: 'markdown/markdown',
    })
  }

  config.push(stylistic)
  return config
}
