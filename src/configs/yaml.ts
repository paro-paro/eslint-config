import { GLOB_YAML } from '../globs'
import { parserYaml } from '../parsers'
import { pluginYaml } from '../plugins'
import type { FlatESLintConfigItemExtended, OptionsYaml } from '../types'

export function yaml(options: OptionsYaml): FlatESLintConfigItemExtended[] {
  const {
    enableStylistic,
    indent = 2,
    quotes = 'single',
  } = options

  return [
    {
      files: [GLOB_YAML],
      languageOptions: {
        parser: parserYaml,
      },
      name: 'config:yaml',
      plugins: {
        yaml: pluginYaml as any,
      },
      rules: {
        'yaml/block-mapping': 'error',
        'yaml/block-sequence': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/plain-scalar': 'error',
        'yaml/vue-custom-block/no-parsing-error': 'error',

        ...enableStylistic
          ? {
              '@stylistic/spaced-comment': 'off',
              'yaml/block-mapping-question-indicator-newline': 'error',
              'yaml/block-sequence-hyphen-indicator-newline': 'error',
              'yaml/flow-mapping-curly-newline': 'error',
              'yaml/flow-mapping-curly-spacing': 'error',
              'yaml/flow-sequence-bracket-newline': 'error',
              'yaml/flow-sequence-bracket-spacing': 'error',
              'yaml/indent': ['error', indent === 'tab' ? 2 : indent],
              'yaml/key-spacing': 'error',
              'yaml/no-tab-indent': 'error',
              'yaml/quotes': ['error', { avoidEscape: false, prefer: quotes }],
              'yaml/spaced-comment': 'error',
            }
          : {},
      },
    },
  ]
}
