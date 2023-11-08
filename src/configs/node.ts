import type { FlatESLintConfigItemExtended, OptionsNode } from '../types'

export function node(options: OptionsNode): FlatESLintConfigItemExtended[] {
  const {
    files,
  } = options

  return [
    {
      files,
      name: 'config:node',
      rules: {
        'node/handle-callback-err': ['error', '^(err|error)$'],
        'node/no-deprecated-api': 'error',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/prefer-global/buffer': ['error', 'never'],
        'node/prefer-global/process': ['error', 'never'],
      },
    },
  ]
}
