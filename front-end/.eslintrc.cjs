module.exports = {
  settings: {
    react: {
      version: "latest",
    },
  },

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["environments/"],
  rules: {
    "platform2/no-unused-classnames": 0,
    "react/prop-types": 0,
    "@typescript-eslint/triple-slash-reference": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "no-unused-vars": "off",
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
      },
    ],
  },
};
