import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default defineConfig([
  globalIgnores([
    '**/node_modules/',
    '**/dist/',
    '**/.output/',
    '**/.netlify/',
    'demo/',
  ]),
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    extends: [typescriptEslint.configs['flat/recommended']],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
]);
