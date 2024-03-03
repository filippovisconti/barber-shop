module.exports = {
    root: true,
    extends: [
        'mantine',
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'plugin:@next/next/recommended',
        'plugin:jest/recommended',
        "plugin:react-hooks/recommended",
        // "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"],
    plugins: ['testing-library', 'jest', '@typescript-eslint', "@trivago/prettier-plugin-sort-imports", 'prettier'],
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
        'no-console': 'error',
        'indent': 'off',
        'import/extensions': 'off',
        'prettier/prettier': 'off',
        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: true,
            },
        ]
    },
};
