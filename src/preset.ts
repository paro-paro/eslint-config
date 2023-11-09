import gitignore from 'eslint-config-flat-gitignore'
import {
  antfu,
  comments,
  ignores,
  imports,
  install,
  javascript,
  jsdoc,
  jsonc,
  node,
  overrides,
  stylistic,
  typescript,
  unicorn,
  unused,
  vue,
  yml,
} from './configs'
import type { Context } from './setup'
import type { FlatConfigItem } from './types'

export function getPreset(ctx: Context): FlatConfigItem[] {
  const {
    enableTs,
    enableVue,
    enableJson,
    enableYml,
    enableJsdoc,
    enableStylistic,
    gitignoreOptions,
    ignoresOptions,
  } = ctx

  const preset: FlatConfigItem[] = []

  if (gitignoreOptions)
    preset.push(gitignore(gitignoreOptions))

  if (ignoresOptions)
    preset.push(ignores(ignoresOptions))

  preset.push(
    ...install(ctx),
    ...javascript(ctx),
  )

  if (enableTs)
    preset.push(...typescript(ctx))

  preset.push(
    ...unused(ctx),
    ...antfu(ctx),
    ...imports(ctx),
    ...node(ctx),
    ...unicorn(ctx),
    ...comments(ctx),
  )

  if (enableJsdoc)
    preset.push(...jsdoc(ctx))

  if (enableStylistic)
    preset.push(...stylistic(ctx))

  if (enableJson)
    preset.push(...jsonc(ctx))

  if (enableYml)
    preset.push(...yml(ctx))

  if (enableVue)
    preset.push(...vue(ctx))

  preset.push(...overrides(ctx))

  return preset
}
