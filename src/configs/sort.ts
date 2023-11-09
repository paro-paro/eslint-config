import type { FlatESLintConfigItemExtended } from '../types'

export const sortPackageJson: FlatESLintConfigItemExtended = {
  files: ['**/package.json'],
  name: 'config:overrides:sort:package.json',
  rules: {
    'jsonc/sort-array-values': [
      'error',
      {
        order: { type: 'asc' },
        pathPattern: '^files$',
      },
    ],
    'jsonc/sort-keys': [
      'error',
      {
        order: [
          'publisher',
          'name',
          'displayName',
          'type',
          'version',
          'private',
          'packageManager',
          'description',
          'author',
          'license',
          'funding',
          'homepage',
          'repository',
          'bugs',
          'keywords',
          'categories',
          'sideEffects',
          'exports',
          'main',
          'module',
          'unpkg',
          'jsdelivr',
          'types',
          'typesVersions',
          'bin',
          'icon',
          'files',
          'engines',
          'activationEvents',
          'contributes',
          'scripts',
          'peerDependencies',
          'peerDependenciesMeta',
          'dependencies',
          'optionalDependencies',
          'devDependencies',
          'pnpm',
          'overrides',
          'resolutions',
          'husky',
          'simple-git-hooks',
          'lint-staged',
          'eslintConfig',
        ],
        pathPattern: '^$',
      },
      {
        order: { type: 'asc' },
        pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
      },
      {
        order: { type: 'asc' },
        pathPattern: '^resolutions$',
      },
      {
        order: { type: 'asc' },
        pathPattern: '^pnpm.overrides$',
      },
      {
        order: [
          'types',
          'import',
          'require',
          'default',
        ],
        pathPattern: '^exports.*$',
      },
    ],
  },
}

export const sortTsConfig: FlatESLintConfigItemExtended = {
  files: ['**/tsconfig.json', '**/tsconfig.*.json'],
  name: 'config:overrides:sort:tsconfig.json',
  rules: {
    'jsonc/sort-keys': [
      'error',
      {
        order: [
          'extends',
          'files',
          'include',
          'exclude',
          'compilerOptions',
          'references',
        ],
        pathPattern: '^$',
      },
      {
        order: [
          /* Projects */
          'incremental',
          'composite',
          'tsBuildInfoFile',
          'disableSourceOfProjectReferenceRedirect',
          'disableSolutionSearching',
          'disableReferencedProjectLoad',
          /* Language and Environment */
          'target',
          'jsx',
          'jsxFactory',
          'jsxFragmentFactory',
          'jsxImportSource',
          'lib',
          'moduleDetection',
          'noLib',
          'reactNamespace',
          'useDefineForClassFields',
          'emitDecoratorMetadata',
          'experimentalDecorators',
          /* Modules */
          'baseUrl',
          'rootDir',
          'rootDirs',
          'customConditions',
          'module',
          'moduleResolution',
          'moduleSuffixes',
          'noResolve',
          'paths',
          'resolveJsonModule',
          'resolvePackageJsonExports',
          'resolvePackageJsonImports',
          'typeRoots',
          'types',
          'allowArbitraryExtensions',
          'allowImportingTsExtensions',
          'allowUmdGlobalAccess',
          /* JavaScript Support */
          'allowJs',
          'checkJs',
          'maxNodeModuleJsDepth',
          /* Type Checking */
          'strict',
          'strictBindCallApply',
          'strictFunctionTypes',
          'strictNullChecks',
          'strictPropertyInitialization',
          'allowUnreachableCode',
          'allowUnusedLabels',
          'alwaysStrict',
          'exactOptionalPropertyTypes',
          'noFallthroughCasesInSwitch',
          'noImplicitAny',
          'noImplicitOverride',
          'noImplicitReturns',
          'noImplicitThis',
          'noPropertyAccessFromIndexSignature',
          'noUncheckedIndexedAccess',
          'noUnusedLocals',
          'noUnusedParameters',
          'useUnknownInCatchVariables',
          /* Emit */
          'declaration',
          'declarationDir',
          'declarationMap',
          'downlevelIteration',
          'emitBOM',
          'emitDeclarationOnly',
          'importHelpers',
          'importsNotUsedAsValues',
          'inlineSourceMap',
          'inlineSources',
          'mapRoot',
          'newLine',
          'noEmit',
          'noEmitHelpers',
          'noEmitOnError',
          'outDir',
          'outFile',
          'preserveConstEnums',
          'preserveValueImports',
          'removeComments',
          'sourceMap',
          'sourceRoot',
          'stripInternal',
          /* Interop Constraints */
          'allowSyntheticDefaultImports',
          'esModuleInterop',
          'forceConsistentCasingInFileNames',
          'isolatedModules',
          'preserveSymlinks',
          'verbatimModuleSyntax',
          /* Completeness */
          'skipDefaultLibCheck',
          'skipLibCheck',
        ],
        pathPattern: '^compilerOptions$',
      },
    ],
  },
}
