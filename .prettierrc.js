module.exports = {
  semi: false,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  bracketSpacing: false,
  arrowParens: "avoid",
  overrides: [
    {
    files: ["dist/browser/subvent.js", "dist/cjs/subvent.js", "dist/esm/subvent.js"],
      options: {
        semi: true,
        singleQuote: false,
        tabWidth: 4
      }
    }
  ]
};
