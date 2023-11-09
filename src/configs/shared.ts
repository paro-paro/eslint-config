import globals from 'globals'
import {
  pluginAntfu,
  pluginComments,
  pluginImport,
  pluginJsdoc,
  pluginNode,
  pluginPerfectionist,
  pluginStylistic,
  pluginTs,
  pluginUnicorn,
  pluginUnusedImports,
} from '../plugins'
import type { FlatESLintConfigItemExtended } from '../types'

interface OptionsShared {
  files: string[]
  enableTs: boolean
  enableJsdoc: boolean
  enablePerfectionist: boolean
  enableStylistic: boolean
}

/* eslint-disable perfectionist/sort-objects */
export function shared(options: OptionsShared): FlatESLintConfigItemExtended[] {
  const {
    files,
    enableTs,
    enableJsdoc,
    enablePerfectionist,
    enableStylistic,
  } = options

  return [
    {
      files,
      name: 'config:shared:globals:plugins',

      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.browser,
          ...globals.es2021,
        },
      },

      linterOptions: {
        reportUnusedDisableDirectives: true,
      },

      /* eslint-enable perfectionist/sort-objects */
      plugins: {
        'antfu': pluginAntfu,
        'eslint-comments': pluginComments,
        'import': pluginImport,
        'node': pluginNode,
        'unicorn': pluginUnicorn,
        'unused-imports': pluginUnusedImports,

        ...enableJsdoc && {
          jsdoc: pluginJsdoc,
        },

        ...enablePerfectionist && {
          perfectionist: pluginPerfectionist,
        },

        ...enableStylistic && {
          '@stylistic': pluginStylistic,
        },

        ...enableTs && {
          '@typescript-eslint': pluginTs,
        },
      },
    },
  ]
}
