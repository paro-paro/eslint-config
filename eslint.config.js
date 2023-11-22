// @ts-check
import { paroparo } from './dist/index.js'

export default paroparo(
  {
    ts: true,
    vue: true,
    json: true,
    yml: true,
    markdown: true,
    stylistic: true,
    sort: true,
    globals: true,
    renameRules: true,

    ignores: {
      globs: ['**/playground'],
      override: false,
    },

    gitignore: {
      files: '.eslintignore',
      strict: false,
    },

    tsOptions: {
      // tsconfigPath: './tsconfig.json',
    },

    stylisticOptions: {
      jsx: true,
      indent: 2,
      quotes: 'single',
      semi: 'never',
    },
  },
)
