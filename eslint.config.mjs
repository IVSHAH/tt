// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierPlugin from 'eslint-plugin-prettier';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      'eslint.config.mjs',
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  prettierRecommended,

  {
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,

        allowDefaultProject: true,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];
