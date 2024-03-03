/** @type {import("prettier").Config} */
const config = {
    plugins: ["@trivago/prettier-plugin-sort-imports"],
    printWidth: 100,
    trailingComma: "es5",
    useTabs: false,
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    importOrder: ["^components/(.*)$", "^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true
};

module.exports = config;
