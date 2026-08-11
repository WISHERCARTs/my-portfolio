import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored skill tooling, not part of the app.
    ".agents/**",
    ".claude/**",
    ".cursor/**",
    ".gemini/**",
    ".impeccable/**",
    "Myport/**",
  ]),
]);

export default eslintConfig;
