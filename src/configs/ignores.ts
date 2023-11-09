import { GLOB_EXCLUDE } from '../globs'
import type { ExtendIgnores, FlatESLintConfigItem } from '../types'

export function ignores(options: ExtendIgnores): FlatESLintConfigItem[] {
  const globs
    = Array.isArray(options)
      ? options
      : options.globs

  const override
    = Array.isArray(options)
      ? false
      : options.override

  return [{ ignores: override ? globs : [...GLOB_EXCLUDE, ...globs] }]
}
