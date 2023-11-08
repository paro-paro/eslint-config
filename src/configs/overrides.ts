import { GLOB_DTS, GLOB_SCRIPTS_JS, GLOB_SCRIPTS_TS, GLOB_TEST_JS, GLOB_TEST_TS } from '../globs'
import type { FlatESLintConfigItemExtended } from '../types'
import { sortPackageJson, sortTsConfig } from './sort'

export function overrides(enableTs: boolean, enableJson: boolean): FlatESLintConfigItemExtended[] {
  const configs = []

  const dts: FlatESLintConfigItemExtended = {
    files: [...GLOB_DTS],
    name: 'config:overrides:dts',
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  }

  if (enableTs)
    configs.push(dts)

  const tests: FlatESLintConfigItemExtended = {
    files: enableTs ? [...GLOB_TEST_TS] : [...GLOB_TEST_JS],
    name: 'config:overrides:tests',
    rules: {
      'no-unused-expressions': 'off',
    },
  }

  const scripts: FlatESLintConfigItemExtended = {
    files: enableTs ? [...GLOB_SCRIPTS_TS] : [...GLOB_SCRIPTS_JS],
    name: 'config:overrides:scripts',
    rules: {
      'no-console': 'off',
    },
  }

  configs.push(tests, scripts)

  if (enableJson)
    configs.push(sortPackageJson, sortTsConfig)

  return configs
}
