import { GLOB_EXCLUDE } from '../globs'
import type { FlatConfigItem, IgnoresOptions } from '../types'

export function ignores(options: IgnoresOptions): FlatConfigItem {
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
