module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Additional rules appended
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf', // Ensure line endings are LF
        trailingComma: 'es5', // Use trailing commas where valid in ES5 (objects, arrays, etc.)
        singleQuote: true, // Enforce single quotes
        semi: true, // Enforce semicolons
      },
    ],

    // Example: enabling strict mode for undefined variables
    'no-undef': 'error',
    // Example: enforcing consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],
  },
};
