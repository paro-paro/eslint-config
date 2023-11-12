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
import type { FlatESLintConfigItemExtend } from './types'

export function getPreset(ctx: Context): FlatESLintConfigItemExtend[] {
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

  const preset: FlatESLintConfigItemExtend[] = []

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

  if (enableVue)
    preset.push(...vue(ctx))

  if (enableJson)
    preset.push(...jsonc(ctx))

  if (enableYml)
    preset.push(...yml(ctx))

  preset.push(...overrides(ctx))

  return preset
}
