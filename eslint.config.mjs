import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  globalIgnores(['**/node_modules/', '**/dist/', '**/.output/', '**/.nuxt/']),
  {
    files: ['src/**/*.ts'],
    plugins: { '@typescript-eslint': typescriptEslint },
    languageOptions: { parser: tsParser, sourceType: 'module' },
    rules: typescriptEslint.configs.recommended.rules,
  },
]);
