import {
  comments,
  ignores,
  imports,
  javascript,
  node,
  shared,
  unicorn,
} from './configs'
import type { FlatESLintConfigItem } from './types'

export function getBaseConfig(
  files: string[],
  enableTs: boolean,
  enableStylistic: boolean,
  enablePerfectionist: boolean,
): FlatESLintConfigItem[] {
  return [
    ...ignores,

    ...shared({ files, enableTs, enableStylistic, enablePerfectionist }),

    ...javascript({ files }),

    ...node({ files }),

    ...imports({ files }),

    ...unicorn({ files }),

    ...comments({ files }),
  ]
}
