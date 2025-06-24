import type { Config, IgnoresOptions } from '../types'
import { GLOB_EXCLUDE } from '../globs'

export function ignores(options: IgnoresOptions): Config {
  const {
    globs = [],
    override = false,
  } = options

  return {
    ignores: override ? globs : [...GLOB_EXCLUDE, ...globs],
    name: 'paroparo:ignores',
  }
}
