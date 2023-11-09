import { GLOB_YAML } from '../globs'
import { parserYaml } from '../parsers'
import { pluginYaml } from '../plugins'
import type { FlatESLintConfigItemExtended } from '../types'

interface OptionsYaml {
  indent?: number | 'tab'
  quotes?: 'single' | 'double'
  enableStylistic: boolean
}

/* eslint-disable perfectionist/sort-objects */
export function yaml(options: OptionsYaml): FlatESLintConfigItemExtended[] {
  const {
    indent = 2,
    quotes = 'single',
    enableStylistic,
  } = options

  return [
    {
      files: [GLOB_YAML],
      name: 'config:yaml',

      languageOptions: {
        parser: parserYaml,
      },

      plugins: {
        yaml: pluginYaml,
      },

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        'yaml/block-mapping': 'error',
        'yaml/block-sequence': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/plain-scalar': 'error',
        'yaml/vue-custom-block/no-parsing-error': 'error',

        ...enableStylistic && {
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
        },
      },
    },
  ]
}
