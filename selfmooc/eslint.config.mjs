import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "socket-server.js",
  ]),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-const": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "import/no-anonymous-default-export": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
]);

export default eslintConfig;
