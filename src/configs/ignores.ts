import type { FlatESLintConfigItem, IgnoresOptions } from '../types'
import { GLOB_EXCLUDE } from '../globs'

export function ignores(options: IgnoresOptions): FlatESLintConfigItem {
  const {
    globs = [],
    override = false,
  } = options

  return {
    ignores: override
      ? globs
      : [...GLOB_EXCLUDE, ...globs],
  }
}
