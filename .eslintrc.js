module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    // 'vue/multi-word-component-names': [
    //   'error',
    //   {
    //     ignores: ['index', 'products', 'view'],
    //   },
    // ],

    'vue/order-in-components': 'off',
    'vue/component-definition-name-casing': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    // 'no-restricted-syntax': [
    //   'error',
    //   {
    //     selector:
    //       "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
    //     message: 'Unexpected property on console object was called',
    //   },
    // ],
  },
}
