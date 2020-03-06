module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: 'src/index.js',
      rules: {
        "no-unused-vars": 0
      }
    },
    {
      files: 'dist/cjs/subvent.js',
      env: {
        node: true,
      }
    },
    {
      files: 'dist/browser/subvent.js',
    },
    {
      files: 'dist/esm/subvent.js',
      parserOptions: {
        sourceType: 'module',
      },
      env: {
        es6: true
      }
    }
  ]
}
