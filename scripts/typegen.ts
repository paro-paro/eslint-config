// work in progress...
import { writeFile } from 'node:fs/promises'
import { green } from 'ansis'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'

const configs = [
  {
    plugins: { '': { rules: Object.fromEntries(builtinRules) } },
  },
]

// const configNames = configs.map((i) => i.name).filter(Boolean) as string[]

const dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
  exportTypeName: 'Rules',
})

// dts += `
// // Names of all the configs
// export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
// `

await writeFile('src/typegen.ts', dts)
console.log(green('Type definitions generated!'))
