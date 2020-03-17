module.exports = {
    env: {
      browser: true
    },
    extends: ['airbnb'],
    parser: 'babel-eslint',
    rules: {
      'arrow-parens': 'off',
      'comma-dangle': ['error', 'never'],
      'func-names': ['warn', 'as-needed'],
      'func-style': 'off',
      'no-nested-ternary': 'off',
      'import/extensions': 'off',
      'quote-props': ["error", "as-needed"],
      'jsx-a11y/label-has-for': 'off'
    },
    overrides: [
      {
        files: ['*.spec.jsx', '*.spec.js'],
        env: { jest: true }
      },
      {
        files: ['.storybook/**', 'stories/**'],
        rules: {
          'import/no-extraneous-dependencies': 'off'
        }
      }
    ]
  };