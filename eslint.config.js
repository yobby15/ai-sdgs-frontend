import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^([A-Z_]|motion)' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'prefer-const': 'error',
      'eqeqeq': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      'quotes': ['error', 'single', { avoidEscape: true }],
      
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },
])