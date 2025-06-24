// @ts-check
import paroparo from './dist/index.js'

export default paroparo(
  {
    // ts: false,
    // vue: false,
    // json: false,
    // yml: false,
    // markdown: false,
    // jsdoc: false,
    // stylistic: false,
    // sort: false,

    // globals: false,
    // ignores: false,
    // gitignore: false,
    // renameRules: false,

    // stylisticOptions: {
    //   jsx: true,
    //   indent: 2,
    //   quotes: 'single',
    //   semi: false,
    // },

    // tsOptions: {
    //   tsconfigPath: './tsconfig.json',
    // },
  },

  {
    // do not remove!
    files: ['src/configs/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
)
