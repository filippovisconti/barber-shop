module.exports = {
    root: true,
    settings: {
        'import/resolver': {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    extends: [
        'mantine',
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'plugin:@next/next/recommended',
        'plugin:jest/recommended', "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:react-hooks/recommended",
        // "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"],
    plugins: ['testing-library', 'jest', '@typescript-eslint', 'prettier'],
    overrides: [
        {
            files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react'],
        },
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "error",
        'react/no-danger': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-console': 'error',
        'indent': 'off',
        'import/order': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'prettier/prettier': 'off',
        // 'sort-imports': [
        //     'error',
        //     {
        //         ignoreCase: false,
        //         ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        //         ignoreMemberSort: false,
        //         memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        //         allowSeparatedGroups: true,
        //     },
        // ]
    },
};
