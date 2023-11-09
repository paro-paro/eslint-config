import { isPackageExists } from 'local-pkg'

export function autoDetectTs(): boolean {
  return ['typescript'].some(i => isPackageExists(i))
}

export function autoDetectVue(): boolean {
  return ['vue', 'nuxt', 'vitepress'].some(i => isPackageExists(i))
}
