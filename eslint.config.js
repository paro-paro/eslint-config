// @ts-check
import { paroparo } from './dist/index.js'

export default paroparo(
  {
    ts: true,
    vue: true,
    json: true,
    yml: true,
    markdown: true,
    jsdoc: true,
    stylistic: true,
    perfectionist: true,
    globals: true,
    renameRules: true,
    gitignore: {
      files: '.eslintignore',
    },
    ignores: true,
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

  // {
  //   files: ['**/*.js'],
  //   ignores: ['eslint.config.js'],
  //   rules: {
  //     'perfectionist/sort-objects': 'error',
  //   },
  // },

  // {
  //   files: ['**/*.vue'],
  //   rules: {
  //     'no-console': 'warn',
  //     'perfectionist/sort-objects': 'error',
  //   },
  // },
)
