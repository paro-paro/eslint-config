import type { Context } from './setup'
import type { FlatESLintConfigItemExtend } from './types'
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
  sort,
  stylistic,
  typescript,
  unicorn,
  unused,
  vue,
  yml,
} from './configs'

export function getPreset(ctx: Context): FlatESLintConfigItemExtend[] {
  const config: FlatESLintConfigItemExtend[] = []

  const {
    gitignoreOptions,
    ignoresOptions,
    enableTs,
    enableJsdoc,
    enableSort,
    enableStylistic,
    enableVue,
    enableJson,
    enableYml,
  } = ctx

  if (gitignoreOptions)
    config.push(gitignore(gitignoreOptions))

  if (ignoresOptions)
    config.push(ignores(ignoresOptions))

  config.push(...install(ctx))

  if (enableStylistic)
    config.push(...stylistic(ctx))

  config.push(...javascript(ctx))

  if (enableTs)
    config.push(...typescript(ctx))

  config.push(
    ...unused(ctx),
    ...antfu(ctx),
    ...imports(ctx),
    ...node(ctx),
    ...unicorn(ctx),
    ...comments(ctx),
  )

  if (enableJsdoc)
    config.push(...jsdoc(ctx))

  if (enableSort)
    config.push(...sort(ctx))

  if (enableVue)
    config.push(...vue(ctx))

  if (enableJson)
    config.push(...jsonc(ctx))

  if (enableYml)
    config.push(...yml(ctx))

  config.push(...overrides(ctx))

  return config
}
