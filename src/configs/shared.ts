import globals from 'globals'
import {
  pluginAntfu,
  pluginComments,
  pluginImport,
  pluginNode,
  pluginPerfectionist,
  pluginStylistic,
  pluginTs,
  pluginUnicorn,
  pluginUnusedImports,
} from '../plugins'
import type { FlatESLintConfigItemExtended, OptionsShared } from '../types'

export function shared(options: OptionsShared): FlatESLintConfigItemExtended[] {
  const {
    enablePerfectionist,
    enableStylistic,
    enableTs,
    files,
  } = options

  return [
    {
      files,
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
      name: 'config:globals:plugins',
      plugins: {
        'antfu': pluginAntfu,
        'eslint-comments': pluginComments,
        'import': pluginImport,
        'node': pluginNode,
        'unicorn': pluginUnicorn,
        'unused-imports': pluginUnusedImports,

        ...enableTs && {
          '@typescript-eslint': pluginTs as any,
        },

        ...enableStylistic && {
          '@stylistic': pluginStylistic,
        },

        ...enablePerfectionist && {
          perfectionist: pluginPerfectionist,
        },
      },
    },
  ]
}
