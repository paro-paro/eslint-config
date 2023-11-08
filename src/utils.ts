import { isPackageExists } from 'local-pkg'
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

const vuePackages = ['vue', 'nuxt', 'vitepress']

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

export function autoDetectVue(): boolean {
  return vuePackages.some(i => isPackageExists(i))
}
