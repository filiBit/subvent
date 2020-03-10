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
      files: 'rollup.config.js',
      parserOptions: {
        sourceType: 'module'
      },
      env: {
        es6: true,
        node: true
      }
    },
    {
      files: 'src/index.js',
      parserOptions: {
        sourceType: 'module'
      },
      rules: {
        "no-unused-vars": 0,
        "es6": true
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
