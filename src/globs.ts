/* eslint-disable sort-exports/sort-exports */
export const GLOB_JS = ['**/*.?([cm])js?(x)']
export const GLOB_TS = ['**/*.?([cm])ts?(x)', ...GLOB_JS]

export const GLOB_TEST_JS = ['**/*.{test,spec}.js?(x)']
export const GLOB_TEST_TS = ['**/*.{test,spec}.ts?(x)', ...GLOB_TEST_JS]

export const GLOB_SCRIPTS_JS = ['**/scripts/*.js?(x)']
export const GLOB_SCRIPTS_TS = ['**/scripts/*.ts?(x)', ...GLOB_SCRIPTS_JS]

/* extra file extensions */
export const GLOB_VUE = '**/*.vue'
export const GLOB_JSON = '**/*.json?(c|5)'
export const GLOB_YML = '**/*.y?(a)ml'
export const GLOB_MD = '**/*.md'
export const GLOB_MD_JS = [`${GLOB_MD}/*.js?(x)`]
export const GLOB_MD_TS = [`${GLOB_MD}/*.ts?(x)`, ...GLOB_MD_JS]
export const GLOB_DTS = ['**/*.d.ts']

/* exclude globs */
export const GLOB_DIST = '**/dist'
export const GLOB_NODE_MODULES = '**/node_modules'
export const GLOB_LOCKFILES = [
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',
]

export const GLOB_EXCLUDE = [
  GLOB_DIST,
  GLOB_NODE_MODULES,
  ...GLOB_LOCKFILES,
  '**/output',
  '**/coverage',
  '**/temp',
  '**/fixtures',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.output',
  '**/.vite-inspect',
  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
]
