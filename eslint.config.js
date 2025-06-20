// @ts-check
import paroparo from './dist/index.js'

export default paroparo(
  {
    // ts: true,
    // vue: true,
    // json: true,
    // yml: true,
    // markdown: true,
    // jsdoc: true,
    // sort: true,
    // stylistic: true,
    // globals: true,
    // renameRules: true,

    ignores: false,
    gitignore: true,

    // gitignore: {
    //   // files: '.eslintignore',
    //   strict: true,
    // },

    tsOptions: {
      // tsconfigPath: './tsconfig.json',
    },

    stylisticOptions: {
      jsx: true,
      indent: 2,
      quotes: 'single',
      semi: false,
    },
  },

  {
    // do not remove!
    files: ['src/configs/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
)
