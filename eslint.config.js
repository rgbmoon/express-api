import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: ['**/dist/*', 'tsconfig.json'],
  },
]
