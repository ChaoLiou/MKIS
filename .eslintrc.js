module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': 'off',
    'space-before-function-paren': 'off',
    'semi': 'off',
    'quotes': 'off',
    'no-console': 'off',
    'arrow-parens': 'off'
  }
}
