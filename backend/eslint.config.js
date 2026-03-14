import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
    plugins: {
      'import': importPlugin,
    },
    rules: {
      'import/order': ['warn', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'type'
        ],
        'newlines-between': 'always',
      }],
    },
  },
)
