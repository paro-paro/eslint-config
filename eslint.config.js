// @ts-check
import { paroparo } from './dist/index.js'

export default paroparo(
  {
    perfectionist: true,
  },
  {
    files: ['src/configs/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
)
