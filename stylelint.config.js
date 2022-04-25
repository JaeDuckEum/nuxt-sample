module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'selector-class-pattern': null,
    'color-hex-length': null,
    'function-no-unknown': null,
    'rule-empty-line-before': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'property-no-vendor-prefix': null,
    'selector-pseudo-element-colon-notation': null,
    'font-family-name-quotes': null,
    'declaration-empty-line-before': null,
  },
}
