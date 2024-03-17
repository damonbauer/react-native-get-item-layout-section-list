import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "react-native-get-item-layout-section-list",
      fileName: (format) => `index.${format}.js`,
    },
  },
});
