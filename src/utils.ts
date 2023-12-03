import { isPackageExists } from 'local-pkg'

export function autoDetectTs(): boolean {
  return isPackageExists('typescript')
}

export function autoDetectVue(): boolean {
  return ['vue', 'nuxt', 'vitepress'].some(i => isPackageExists(i))
}

export function interopDefault(m: any) {
  return m.default || m
}

export async function interopDefaultAsync<T>(m: Promise<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default || resolved
}
