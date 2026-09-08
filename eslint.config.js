import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node,
      parser: tsParser,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {},
  },
];
