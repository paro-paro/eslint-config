### Parsers:

`eslint/espree`
- ESLint's default parser, espree.
- Implicitly installed.
- [Parser Options](https://github.com/eslint/espree#options)

`@typescript-eslint/parser`
- Replacement for ESLint's default parser, espree. 
- Need to be explicitly installed.
- The current configuration uses this parser for both ts and js files when typescript is enabled (mixed codebase).
- I believe this is the best option.
- [Parser Options](https://typescript-eslint.io/packages/parser#configuration)

### CLI
- Use `eslint --print-config` command to print the final applied config (after all the merging and processing is done).
- Usage:
  - `eslint --print-config a.js`
  - `eslint --print-config a.ts`
  - `eslint --print-config a.ctsx`
  - `eslint --print-config a.json`
  - `eslint --print-config a.vue`
