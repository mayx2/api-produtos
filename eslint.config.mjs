import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, 
        ...globals.jest  
      }
    },
    rules: {
      
      ...js.configs.recommended.rules,
    }
  },
];