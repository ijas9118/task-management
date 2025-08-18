import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, import: pluginImport },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      // Common best practices
      eqeqeq: "error", // Require === and !== instead of == and !=
      curly: ["error", "all"], // Require curly braces for all control statements
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn about unused vars; ignore ones starting with _
      "no-console": "warn", // Discourage console.log in production code
      "no-var": "error", // Disallow var, prefer let/const
      "prefer-const": "error", // Prefer const if variable not reassigned
      "consistent-return": "error", // Require consistent return statements
      "no-implicit-coercion": "error", // Disallow shorthand type conversions
      "no-throw-literal": "error", // Require throwing Error objects instead of literals

      // Stylistic preferences (adjust as per your team's style)
      semi: ["error", "always"], // Require semicolons
      indent: ["error", 2], // 2-space indentation

      // TypeScript specific rules to improve type safety (you may override or extend these)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "warn", // Encourage explicit return types
      "@typescript-eslint/no-explicit-any": "warn", // Discourage use of 'any' type

      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node "builtin" modules (fs, path)
            "external", // External modules (npm packages)
            "internal", // Internal aliases
            ["parent", "sibling", "index"], // Relative imports
            "object", // import foo = require('foo')
            "type", // Type imports (import type ...)
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  tseslint.configs.recommended,
  {
    ignores: ["dist/**", "node_modules/**", "eslint.config.mjs", "src/grpc"],
  },
]);
