module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'import/extensions': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    'react/function-component-definition': [2, {
      namedComponents: ['function-expression', 'arrow-function', 'function-declaration'],
    }],
    'no-shadow': 'off',
    'import/no-unresolved': 0,
    'react/require-default-props': 'off',
    'no-plusplus': 'off',
    'no-undef': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      // 配置别名
      alias: {
        map: [['@', './src/']],
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },
      typescript: {},
    },
  },
  globals: {
    JSX: 'readonly',
    IdLike: 'readonly',
  },
};
