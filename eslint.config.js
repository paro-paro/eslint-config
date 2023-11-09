import { paroparo } from './dist/index.js'

export default paroparo(
  {
    vue: true,
  },
  {
    files: ['src/configs/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
)
