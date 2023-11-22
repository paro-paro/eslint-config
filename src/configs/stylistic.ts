import type { Context } from '../setup'
import type { FlatESLintConfigItemExtend } from '../types'

/* eslint-disable perfectionist/sort-objects */
export function stylistic(ctx: Context): FlatESLintConfigItemExtend[] {
  const {
    files,
    enableTs,
    enableRenameRules,
    stylisticOptions,
  } = ctx

  const {
    jsx = true,
    indent = 2,
    quotes = 'single',
    semi = 'never',
  } = stylisticOptions

  const prefix = enableRenameRules ? 'stylistic' : '@stylistic'

  return [
    {
      files,
      name: enableTs
        ? 'config:rules:typescript:stylistic'
        : 'config:rules:javascript:stylistic',

      /* eslint-enable perfectionist/sort-objects */
      rules: {
        [`${prefix}/array-bracket-spacing`]: ['error', 'never'],
        [`${prefix}/arrow-parens`]: ['error', 'as-needed', { requireForBlockBody: true }],
        [`${prefix}/arrow-spacing`]: ['error', { after: true, before: true }],
        [`${prefix}/block-spacing`]: ['error', 'always'],
        [`${prefix}/brace-style`]: ['error', 'stroustrup', { allowSingleLine: true }],
        [`${prefix}/comma-dangle`]: ['error', 'always-multiline'],
        [`${prefix}/comma-spacing`]: ['error', { after: true, before: false }],
        [`${prefix}/comma-style`]: ['error', 'last'],
        [`${prefix}/computed-property-spacing`]: ['error', 'never', { enforceForClassMembers: true }],
        [`${prefix}/dot-location`]: ['error', 'property'],
        [`${prefix}/eol-last`]: 'error',
        [`${prefix}/indent`]: ['error', indent, {
          ArrayExpression: 1,
          CallExpression: { arguments: 1 },
          flatTernaryExpressions: false,
          FunctionDeclaration: { body: 1, parameters: 1 },
          FunctionExpression: { body: 1, parameters: 1 },
          ignoreComments: false,
          ignoredNodes: [
            'TemplateLiteral *',
            'JSXElement',
            'JSXElement > *',
            'JSXAttribute',
            'JSXIdentifier',
            'JSXNamespacedName',
            'JSXMemberExpression',
            'JSXSpreadAttribute',
            'JSXExpressionContainer',
            'JSXOpeningElement',
            'JSXClosingElement',
            'JSXFragment',
            'JSXOpeningFragment',
            'JSXClosingFragment',
            'JSXText',
            'JSXEmptyExpression',
            'JSXSpreadChild',
            'TSTypeParameterInstantiation',
            'FunctionExpression > .params[decorators.length > 0]',
            'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
            'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
          ],
          ImportDeclaration: 1,
          MemberExpression: 1,
          ObjectExpression: 1,
          offsetTernaryExpressions: true,
          outerIIFEBody: 1,
          SwitchCase: 1,
          VariableDeclarator: 1,
        }],
        [`${prefix}/key-spacing`]: ['error', { afterColon: true, beforeColon: false }],
        [`${prefix}/keyword-spacing`]: ['error', { after: true, before: true }],
        [`${prefix}/lines-between-class-members`]: ['error', 'always', { exceptAfterSingleLine: true }],
        [`${prefix}/max-statements-per-line`]: ['error', { max: 1 }],
        [`${prefix}/member-delimiter-style`]: ['error', { multiline: { delimiter: 'none' } }],
        [`${prefix}/multiline-ternary`]: ['error', 'always-multiline'],
        [`${prefix}/new-parens`]: 'error',
        [`${prefix}/no-extra-parens`]: ['error', 'functions'],
        [`${prefix}/no-floating-decimal`]: 'error',
        [`${prefix}/no-mixed-operators`]: ['error', {
          allowSamePrecedence: true,
          groups: [
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof'],
          ],
        }],
        [`${prefix}/no-mixed-spaces-and-tabs`]: 'error',
        [`${prefix}/no-multi-spaces`]: 'error',
        [`${prefix}/no-multiple-empty-lines`]: ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        [`${prefix}/no-tabs`]: indent === 'tab' ? 'off' : 'error',
        [`${prefix}/no-trailing-spaces`]: 'error',
        [`${prefix}/no-whitespace-before-property`]: 'error',
        [`${prefix}/object-curly-spacing`]: ['error', 'always'],
        [`${prefix}/operator-linebreak`]: ['error', 'before'],
        [`${prefix}/padded-blocks`]: ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
        [`${prefix}/quote-props`]: ['error', 'consistent-as-needed'],
        [`${prefix}/quotes`]: ['error', quotes, { allowTemplateLiterals: true, avoidEscape: false }],
        [`${prefix}/rest-spread-spacing`]: ['error', 'never'],
        [`${prefix}/semi-spacing`]: ['error', { after: true, before: false }],
        [`${prefix}/semi`]: ['error', semi],
        [`${prefix}/space-before-blocks`]: ['error', 'always'],
        [`${prefix}/space-before-function-paren`]: ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
        [`${prefix}/space-in-parens`]: ['error', 'never'],
        [`${prefix}/space-infix-ops`]: 'error',
        [`${prefix}/space-unary-ops`]: ['error', { nonwords: false, words: true }],
        [`${prefix}/spaced-comment`]: ['error', 'always', {
          block: {
            balanced: true,
            exceptions: ['*'],
            markers: ['!'],
          },
          line: {
            exceptions: ['/', '#'],
            markers: ['/'],
          },
        }],
        [`${prefix}/template-curly-spacing`]: 'error',
        [`${prefix}/template-tag-spacing`]: ['error', 'never'],
        [`${prefix}/type-annotation-spacing`]: ['error', {}],
        [`${prefix}/wrap-iife`]: ['error', 'any', { functionPrototypeMethods: true }],
        [`${prefix}/yield-star-spacing`]: ['error', 'both'],

        ...jsx && {
          [`${prefix}/jsx-closing-bracket-location`]: 'error',
          [`${prefix}/jsx-closing-tag-location`]: 'error',
          [`${prefix}/jsx-curly-brace-presence`]: ['error', { propElementValues: 'always' }],
          [`${prefix}/jsx-curly-newline`]: 'error',
          [`${prefix}/jsx-curly-spacing`]: ['error', 'never'],
          [`${prefix}/jsx-equals-spacing`]: 'error',
          [`${prefix}/jsx-first-prop-new-line`]: 'error',
          [`${prefix}/jsx-indent-props`]: ['error', indent],
          [`${prefix}/jsx-indent`]: ['error', indent, { checkAttributes: true, indentLogicalExpressions: true }],
          [`${prefix}/jsx-max-props-per-line`]: ['error', { maximum: 1, when: 'multiline' }],
          [`${prefix}/jsx-one-expression-per-line`]: ['error', { allow: 'single-child' }],
          [`${prefix}/jsx-quotes`]: 'error',
          [`${prefix}/jsx-tag-spacing`]: [
            'error',
            {
              afterOpening: 'never',
              beforeClosing: 'never',
              beforeSelfClosing: 'always',
              closingSlash: 'never',
            },
          ],
          [`${prefix}/jsx-wrap-multilines`]: [
            'error',
            {
              arrow: 'parens-new-line',
              assignment: 'parens-new-line',
              condition: 'parens-new-line',
              declaration: 'parens-new-line',
              logical: 'parens-new-line',
              prop: 'parens-new-line',
              return: 'parens-new-line',
            },
          ],
        },
      },
    },
  ]
}
