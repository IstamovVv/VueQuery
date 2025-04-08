 
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { defineConfig } from 'eslint/config';
import eslintImportPlugin from 'eslint-plugin-import';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unicornEslint from 'eslint-plugin-unicorn';
import eslintVue from 'eslint-plugin-vue';

const vueConfigs = defineConfigWithVueTs(
  eslint.configs.recommended,
  vueTsConfigs.recommended,
  eslintVue.configs['flat/recommended'],
  unicornEslint.configs['flat/recommended'],
)

export default defineConfig([
  ...vueConfigs,
  {
    plugins: {
      '@stylistic': stylistic,
      'import': eslintImportPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'guard-for-in': 'off',
      'no-restricted-syntax': 'off',
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'no-underscore-dangle': 'off',
      'no-implicit-coercion': [
        'error',
        {
          boolean: true,
          number: true,
          string: true,
        },
      ],
      'no-restricted-properties': [
        'warn',
        {
          object: 'Object',
          property: 'fromEntries',
          message: 'Используйте typedObjectFromEntries',
        },
      ],
      'no-console': 'warn',

      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'import/no-self-import': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'unicorn/prefer-global-this': 'off',
      'unicorn/switch-case-braces': 'off',
      'unicorn/no-useless-switch-case': 'off',
      'unicorn/prefer-native-coercion-functions': 'off',
      'unicorn/prefer-at': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prefer-structured-clone': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            i: true,
            props: true,
            Props: true,
            ref: true,
            Ref: true,
            args: true,
            env: true,
            Env: true,
          },
        },
      ],

      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'ATTR_DYNAMIC',
            'ATTR_SHORTHAND_BOOL',
            'ATTR_STATIC',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        },
      ],
      'vue/valid-v-slot': [
        'error',
        {
          allowModifiers: true,
        },
      ],
      'vue/prefer-separate-static-class': 'error',
      'vue/padding-line-between-tags': ['error', [{ blankLine: 'always', prev: '*', next: '*' }]], // пустая строка между тегами

      '@stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      '@stylistic/max-len': [
        'warn',
        {
          code: 120,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'expression',
            'block-like',
            'return',
            'multiline-let',
            'multiline-const',
            'throw',
            'function',
            'try',
          ],
        },
        {
          blankLine: 'always',
          prev: ['expression', 'block-like', 'multiline-let', 'multiline-const', 'function', 'try'],
          next: '*',
        },
        { blankLine: 'any', prev: 'expression', next: 'expression' },
        { blankLine: 'any', prev: '*', next: 'break' },
      ],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/indent': ['error', 2, {
        ImportDeclaration: 1,
        SwitchCase: 1,
        MemberExpression: 1,
        FunctionDeclaration: { body: 1, parameters: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        offsetTernaryExpressions: true,
        ignoreComments: true,
      }],
      '@stylistic/no-tabs': 'error',

      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: {
            optionalityOrder: 'required-first',
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    }
  },
  {
    ignores: [
      'components.d.ts',
      'dist',
      '**/*.mjs',
      'src/vite-env.d.ts'
    ],
  },
]);