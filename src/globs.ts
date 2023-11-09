export const GLOB_JS = [
  '**/*.?([cm])js',
  '**/*.?([cm])jsx',
]

export const GLOB_TS = [
  '**/*.?([cm])ts',
  '**/*.?([cm])tsx',
  ...GLOB_JS,
]

export const GLOB_TEST_JS = ['**/*.{test,spec}.js?(x)']
export const GLOB_TEST_TS = [
  '**/*.{test,spec}.ts?(x)',
  ...GLOB_TEST_JS,
]

export const GLOB_SCRIPTS_JS = ['**/scripts/*.js?(x)']
export const GLOB_SCRIPTS_TS = [
  '**/scripts/*.ts?(x)',
  ...GLOB_SCRIPTS_JS,
]

export const GLOB_YML = '**/*.y?(a)ml'
export const GLOB_JSON = '**/*.json'
export const GLOB_JSONC = '**/*.jsonc'
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_MD = '**/*.md'
export const GLOB_VUE = '**/*.vue'
export const GLOB_DTS = ['**/*.d.ts']

export const GLOB_MD_CODE_JS = [
  `${GLOB_MD}/*.js`,
  `${GLOB_MD}/*.jsx`,
]

export const GLOB_MD_CODE_TS = [
  `${GLOB_MD}/*.ts`,
  `${GLOB_MD}/*.tsx`,
  ...GLOB_MD_CODE_JS,
]

// ignores
export const GLOB_DIST = '**/dist'
export const GLOB_NODE_MODULES = '**/node_modules'
export const GLOB_LOCKFILES = [
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',
]

export const GLOB_EXCLUDE = [
  GLOB_NODE_MODULES,
  GLOB_DIST,
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
