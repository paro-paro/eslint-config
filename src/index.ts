import type { Linter } from 'eslint'
import type { TailwindOptions } from './tailwind'
import js from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import gitignoreConfig from 'eslint-config-flat-gitignore'
import antfuPlugin from 'eslint-plugin-antfu'
import importPlugin from 'eslint-plugin-import-x'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import unicornPlugin from 'eslint-plugin-unicorn'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import vuePlugin from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import {
  FILES_DECLARATIONS,
  FILES_JS,
  FILES_TS,
  FILES_VUE,
  PREFIX,
  RULES_CORRECTNESS,
  RULES_CORRECTNESS_VUE,
  RULES_STYLE,
  RULES_STYLE_VUE,
} from './constants'
import { tailwindConfig } from './tailwind'

export type { TailwindOptions }

export interface Options {
  /**
   * Ignore files listed in the project's `.gitignore`.
   *
   * @default true
   */
  gitignore?: boolean
  /**
   * Enable style rules (formatting, ordering, naming).
   *
   * @default true
   */
  style?: boolean
  /**
   * Enable Vue support (`.vue` files).
   *
   * @default false
   */
  vue?: boolean
  /**
   * Enable Tailwind CSS rules (requires `eslint-plugin-better-tailwindcss`).
   *
   * @default undefined
   */
  tailwind?: TailwindOptions
}

function rulesOf(configs: Linter.Config[]): Linter.RulesRecord {
  return Object.assign({}, ...configs.map((config) => config.rules))
}

/** ESLint config for TypeScript and JavaScript, with optional Vue and Tailwind CSS support */
export default async function paroparo(
  options: Options = {},
  ...configs: Linter.Config[]
): Promise<Linter.Config[]> {
  const {
    gitignore = true,
    style = true,
    vue = false,
    tailwind,
  } = options

  const rulesStyle = style
    ? RULES_STYLE
    : {}

  const rulesStyleVue = style
    ? RULES_STYLE_VUE
    : vuePlugin.configs['no-layout-rules'].rules

  const configTailwind = tailwind
    ? await tailwindConfig(
        [...FILES_JS, ...FILES_TS, ...(vue ? FILES_VUE : [])],
        tailwind,
        style,
      )
    : []

  return defineConfig(
    gitignore ? gitignoreConfig({ strict: false }) : [],
    {
      name: `${PREFIX}/plugins`,
      plugins: {
        '@stylistic': stylisticPlugin,
        '@typescript-eslint': tsEslint.plugin,
        'antfu': antfuPlugin,
        'import-x': importPlugin,
        'jsdoc': jsdocPlugin,
        'perfectionist': perfectionistPlugin,
        'unicorn': unicornPlugin,
        'unused-imports': unusedImportsPlugin,
        'vue': vuePlugin,
      },
    },
    {
      files: FILES_JS,
      name: `${PREFIX}/javascript`,
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
        },
        parser: tsEslint.parser,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...RULES_CORRECTNESS,
        ...rulesStyle,
      },
    },
    {
      files: FILES_TS,
      name: `${PREFIX}/typescript`,
      languageOptions: {
        parser: tsEslint.parser,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...rulesOf(tsEslint.configs.recommended),
        ...RULES_CORRECTNESS,
        ...rulesStyle,
      },
    },
    vue
      ? {
          files: FILES_VUE,
          name: `${PREFIX}/vue`,
          processor: 'vue/vue',
          languageOptions: {
            parser: vueParser,
            parserOptions: {
              extraFileExtensions: ['.vue'],
              parser: tsEslint.parser,
            },
          },
          rules: {
            ...js.configs.recommended.rules,
            ...rulesOf(tsEslint.configs.recommended),
            ...rulesOf(vuePlugin.configs['flat/recommended']),
            ...RULES_CORRECTNESS,
            ...RULES_CORRECTNESS_VUE,
            ...rulesStyle,
            ...rulesStyleVue,
          },
        }
      : [],
    configTailwind,
    {
      files: FILES_DECLARATIONS,
      name: `${PREFIX}/declarations`,
      rules: {
        'unicorn/require-module-specifiers': 'off',
      },
    },
    ...configs,
  )
}
