### Parsers:

`eslint/espree`
- [Parser Options](https://github.com/eslint/espree#options)
- ESLint's default parser, espree.
- Implicitly installed.

`@typescript-eslint/parser` (explicit)
- [Parser Options](https://typescript-eslint.io/packages/parser#configuration)
- Replacement for ESLint's default parser, espree. 
- Need to be explicitly installed.
- The current configuration uses this parser for both ts and js files when typescript is enabled (mixed codebase).
- I believe this is the best option.
