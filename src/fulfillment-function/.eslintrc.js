module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/interface-name-prefix': [
            'error',
            {
                prefixWithI: 'always',
            },
        ],
        'prettier/prettier': 'error',
    },
    env: {
        es6: true,
    },
};
