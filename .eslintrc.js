module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'svelte3',
  ],
  rules: {
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
  },
  settings: {
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 0,
        'import/no-duplicates': 0,
        'import/no-mutable-exports': 0,
        'import/no-extraneous-dependencies': ['off'],
      },
    },
  ],
};
