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
import type { ExtendIgnores, FlatESLintConfigItem } from './types'

interface BaseConfigOptions {
  files: string[]
  enableTs: boolean
  enableJsdoc: boolean
  enablePerfectionist: boolean
  enableStylistic: boolean
  extendIgnores: ExtendIgnores
}

const typescript = ['typescript']
const vue = ['vue', 'nuxt', 'vitepress']

export function autoDetectTs(): boolean {
  return typescript.some(i => isPackageExists(i))
}

export function autoDetectVue(): boolean {
  return vue.some(i => isPackageExists(i))
}

export function getBaseConfig(options: BaseConfigOptions): FlatESLintConfigItem[] {
  const {
    files,
    enableTs,
    enableJsdoc,
    enableStylistic,
    enablePerfectionist,
    extendIgnores,
  } = options

  return [
    ...ignores(extendIgnores),

    ...shared({
      files,
      enableTs,
      enableJsdoc,
      enableStylistic,
      enablePerfectionist,
    }),

    ...javascript(files),
    ...node(files),
    ...imports(files),
    ...unicorn(files),
    ...comments(files),
  ]
}
