import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next*/**",
      "out/**",
      "dist/**",
      "node_modules/**",
      ".claude/**",
      ".venv/**",
      "cloudflare/contact-worker/.wrangler/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Existing modal/form state synchronization is intentional for now. Keep
    // the React Compiler guidance visible without blocking unrelated PRs.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
    },
  },
];

export default eslintConfig;
