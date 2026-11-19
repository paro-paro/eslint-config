import type { Linter } from 'eslint'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  PREFIX,
  RULES_CORRECTNESS_TAILWIND,
  RULES_STYLE_TAILWIND,
} from './constants'

export interface TailwindOptions {
  /**
   * Path to your main CSS file (the one with `@import 'tailwindcss'`).
   *
   * @see https://github.com/paro-paro/eslint-config#tailwind-css for how relative paths and file URLs are resolved
   */
  stylesheet: string | URL
  /**
   * Directory from which `tailwindcss` is resolved.
   *
   * @default The `stylesheet` directory.
   */
  cwd?: string | URL
}

function toPath(path: string | URL): string {
  return path instanceof URL ? fileURLToPath(path) : resolve(path)
}

export async function tailwindConfig(
  files: string[],
  options: TailwindOptions,
  style: boolean,
): Promise<Linter.Config> {
  const [
    { default: tailwindPlugin },
    { getDefaultSelectors },
    { MatcherType, SelectorKind },
  ] = await Promise
    .all([
      import('eslint-plugin-better-tailwindcss'),
      import('eslint-plugin-better-tailwindcss/defaults'),
      import('eslint-plugin-better-tailwindcss/types'),
    ])
    .catch((err: unknown) => {
      throw new Error(
        'The `tailwind` option requires `eslint-plugin-better-tailwindcss` to be installed',
        { cause: err },
      )
    })

  const stylesheet = toPath(options.stylesheet)
  const cwd = options.cwd ? toPath(options.cwd) : dirname(stylesheet)

  return {
    files,
    name: `${PREFIX}/tailwind`,
    plugins: {
      'better-tailwindcss': tailwindPlugin,
    },
    rules: {
      ...RULES_CORRECTNESS_TAILWIND,
      ...(style ? RULES_STYLE_TAILWIND : {}),
    },
    settings: {
      'better-tailwindcss': {
        cwd,
        entryPoint: stylesheet,
        selectors: [
          ...getDefaultSelectors(),
          {
            name: '^v-bind:ui$',
            kind: SelectorKind.Attribute,
            match: [{ type: MatcherType.ObjectValue }],
          },
          {
            name: '^defineAppConfig$',
            kind: SelectorKind.Callee,
            match: [
              { path: String.raw`^ui\.[^.]+\.slots\..+$`, type: MatcherType.ObjectValue },
              { path: String.raw`^ui\.[^.]+\.variants\..+$`, type: MatcherType.ObjectValue },
              {
                path: String.raw`^ui\.[^.]+\.(?:compoundVariants|compoundSlots)\[\d+\]\.class.*$`,
                type: MatcherType.ObjectValue,
              },
            ],
          },
        ],
      },
    },
  }
}
