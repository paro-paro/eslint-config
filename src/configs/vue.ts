import type { Context } from '../setup'
import type { Config } from '../types'
import { GLOB_VUE } from '../globs'

export function vue(ctx: Context): Config[] {
  const {
    enableStylistic,
    stylisticOptions,
  } = ctx

  const {
    indent = 2,
  } = stylisticOptions

  return [
    {
      files: [GLOB_VUE],
      name: 'paroparo:rules:vue',
      rules: {
        // base
        ...{
          'vue/comment-directive': 'error',
          'vue/jsx-uses-vars': 'error',
        },

        // vue3-essential
        ...{
          // 'vue/multi-word-component-names': 'off',
          'vue/no-arrow-functions-in-watch': 'error',
          'vue/no-async-in-computed-properties': 'error',
          'vue/no-child-content': 'error',
          'vue/no-computed-properties-in-data': 'error',
          'vue/no-deprecated-data-object-declaration': 'error',
          'vue/no-deprecated-destroyed-lifecycle': 'error',
          'vue/no-deprecated-dollar-listeners-api': 'error',
          'vue/no-deprecated-dollar-scopedslots-api': 'error',
          'vue/no-deprecated-events-api': 'error',
          'vue/no-deprecated-filter': 'error',
          'vue/no-deprecated-functional-template': 'error',
          'vue/no-deprecated-html-element-is': 'error',
          'vue/no-deprecated-inline-template': 'error',
          'vue/no-deprecated-props-default-this': 'error',
          'vue/no-deprecated-router-link-tag-prop': 'error',
          'vue/no-deprecated-scope-attribute': 'error',
          'vue/no-deprecated-slot-attribute': 'error',
          'vue/no-deprecated-slot-scope-attribute': 'error',
          'vue/no-deprecated-v-bind-sync': 'error',
          'vue/no-deprecated-v-is': 'error',
          'vue/no-deprecated-v-on-native-modifier': 'error',
          'vue/no-deprecated-v-on-number-modifiers': 'error',
          'vue/no-deprecated-vue-config-keycodes': 'error',
          'vue/no-dupe-keys': 'error',
          'vue/no-dupe-v-else-if': 'error',
          'vue/no-duplicate-attributes': 'error',
          'vue/no-export-in-script-setup': 'error',
          'vue/no-expose-after-await': 'error',
          'vue/no-lifecycle-after-await': 'error',
          'vue/no-mutating-props': 'error',
          'vue/no-parsing-error': 'error',
          'vue/no-ref-as-operand': 'error',
          'vue/no-reserved-component-names': 'error',
          'vue/no-reserved-keys': 'error',
          'vue/no-reserved-props': 'error',
          'vue/no-shared-component-data': 'error',
          'vue/no-side-effects-in-computed-properties': 'error',
          'vue/no-template-key': 'error',
          'vue/no-textarea-mustache': 'error',
          'vue/no-unused-components': 'error',
          'vue/no-unused-vars': 'error',
          'vue/no-use-computed-property-like-method': 'error',
          'vue/no-use-v-if-with-v-for': 'error',
          'vue/no-useless-template-attributes': 'error',
          'vue/no-v-for-template-key-on-child': 'error',
          'vue/no-v-text-v-html-on-component': 'error',
          'vue/no-watch-after-await': 'error',
          'vue/prefer-import-from-vue': 'error',
          'vue/require-component-is': 'error',
          'vue/require-prop-type-constructor': 'error',
          'vue/require-render-return': 'error',
          'vue/require-slots-as-functions': 'error',
          'vue/require-toggle-inside-transition': 'error',
          'vue/require-v-for-key': 'error',
          'vue/require-valid-default-prop': 'error',
          // 'vue/return-in-computed-property': 'off',
          'vue/return-in-emits-validator': 'error',
          'vue/use-v-on-exact': 'error',
          'vue/valid-attribute-name': 'error',
          'vue/valid-define-emits': 'error',
          'vue/valid-define-props': 'error',
          'vue/valid-next-tick': 'error',
          'vue/valid-template-root': 'error',
          'vue/valid-v-bind': 'error',
          'vue/valid-v-cloak': 'error',
          'vue/valid-v-else': 'error',
          'vue/valid-v-else-if': 'error',
          'vue/valid-v-for': 'error',
          'vue/valid-v-html': 'error',
          'vue/valid-v-if': 'error',
          'vue/valid-v-is': 'error',
          'vue/valid-v-memo': 'error',
          'vue/valid-v-model': 'error',
          'vue/valid-v-on': 'error',
          'vue/valid-v-once': 'error',
          'vue/valid-v-pre': 'error',
          'vue/valid-v-show': 'error',
          'vue/valid-v-slot': 'error',
          'vue/valid-v-text': 'error',
        },

        // vue3-strongly-recommended
        ...{
          'vue/attribute-hyphenation': 'warn',
          'vue/component-definition-name-casing': 'warn',
          'vue/first-attribute-linebreak': ['error', {
            multiline: 'below',
            singleline: 'beside',
          }],
          'vue/html-closing-bracket-newline': 'warn',
          'vue/html-closing-bracket-spacing': 'warn',
          'vue/html-end-tags': 'warn',
          'vue/html-indent': ['error', indent],
          'vue/html-quotes': ['error', 'double'],
          'vue/html-self-closing': 'warn',
          // 'vue/max-attributes-per-line': 'warn',
          'vue/multiline-html-element-content-newline': 'warn',
          'vue/mustache-interpolation-spacing': 'warn',
          'vue/no-multi-spaces': 'warn',
          'vue/no-spaces-around-equal-signs-in-attribute': 'warn',
          'vue/no-template-shadow': 'warn',
          'vue/one-component-per-file': 'warn',
          'vue/prop-name-casing': ['error', 'camelCase'],
          // 'vue/require-default-prop': 'off',
          'vue/require-explicit-emits': 'warn',
          'vue/require-prop-types': 'warn',
          'vue/singleline-html-element-content-newline': 'warn',
          'vue/v-bind-style': 'warn',
          'vue/v-on-event-hyphenation': ['warn', 'always', { autofix: true }],
          'vue/v-on-style': 'warn',
          'vue/v-slot-style': 'warn',
        },

        // vue3-recommended
        ...{
          'vue/attributes-order': ['error', {
            alphabetical: true,
            order: [
              'DEFINITION', // is
              'GLOBAL', // id
              'CONTENT', // v-text / v-html
              'SLOT', // v-slot
              'CONDITIONALS', // v-if / v-else / v-else-if / v-show / v-cloak
              'TWO_WAY_BINDING', // v-model
              'OTHER_DIRECTIVES', // custom directives
              'LIST_RENDERING', // v-for
              'UNIQUE', // key / ref
              // 'OTHER_ATTR', // v-bind
              'ATTR_SHORTHAND_BOOL',
              'ATTR_STATIC',
              'ATTR_DYNAMIC',
              'EVENTS', // v-on
              'RENDER_MODIFIERS', // v-pre - v-once
            ],
          }],
          // 'vue/component-tags-order': 'warn',
          'vue/no-lone-template': 'warn',
          'vue/no-multiple-slot-args': 'warn',
          'vue/no-v-html': 'warn',
          'vue/order-in-components': 'warn',
          'vue/this-in-template': 'warn',
        },

        // ...
        ...{
          'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
          'vue/component-name-in-template-casing': ['error', 'PascalCase'],
          'vue/component-options-name-casing': ['error', 'PascalCase'],
          'vue/custom-event-name-casing': ['error', 'camelCase'],
          'vue/define-macros-order': ['error', { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] }],
          'vue/dot-location': ['error', 'property'],
          'vue/dot-notation': ['error', { allowKeywords: true }],
          'vue/eqeqeq': ['error', 'smart'],
          'vue/no-empty-pattern': 'error',
          'vue/no-extra-parens': ['error', 'functions'],
          'vue/no-irregular-whitespace': 'error',
          'vue/no-loss-of-precision': 'error',
          'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
          'vue/no-restricted-v-bind': ['error', '/^v-/'],
          'vue/no-setup-props-reactivity-loss': 'off',
          'vue/no-sparse-arrays': 'error',
          'vue/no-unused-refs': 'error',
          'vue/no-useless-v-bind': 'error',
          'vue/object-shorthand': ['error', 'always', { avoidQuotes: true, ignoreConstructors: false }],
          'vue/prefer-separate-static-class': 'error',
          'vue/prefer-template': 'error',
          'vue/space-infix-ops': 'error',
          'vue/space-unary-ops': ['error', { nonwords: false, words: true }],
        },

        ...enableStylistic && {
          'vue/array-bracket-spacing': ['error', 'never'],
          'vue/arrow-spacing': ['error', { after: true, before: true }],
          'vue/block-spacing': ['error', 'always'],
          'vue/block-tag-newline': ['error', { multiline: 'always', singleline: 'always' }],
          'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
          'vue/comma-dangle': ['error', 'always-multiline'],
          'vue/comma-spacing': ['error', { after: true, before: false }],
          'vue/comma-style': ['error', 'last'],
          'vue/html-comment-content-spacing': ['error', 'always', { exceptions: ['-'] }],
          'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
          'vue/keyword-spacing': ['error', { after: true, before: true }],
          'vue/object-curly-newline': 'off',
          'vue/object-curly-spacing': ['error', 'always'],
          'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
          'vue/operator-linebreak': ['error', 'before'],
          'vue/padding-line-between-blocks': ['error', 'always'],
          'vue/quote-props': ['error', 'consistent-as-needed'],
          'vue/space-in-parens': ['error', 'never'],
          'vue/template-curly-spacing': 'error',
        },
      },
    },
  ]
}
