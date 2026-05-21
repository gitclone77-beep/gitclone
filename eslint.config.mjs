import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "backend/dist/**",
      "backend/node_modules/**",
      "backend/**",
      "next-env.d.ts"
    ]
  }
];

export default eslintConfig;
