/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 120,
  singleQuote: false,
  trailingComma: "es5",
  singleAttributePerLine: true,
  tabWidth: 2,
};
