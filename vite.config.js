import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS ? ["dot", "github-actions"] : ["dot"],
    coverage: {
      reporter: ["default", "text", "json", "html"],
      reportOnFailure: true,
    },
  },
  build: {
    minify: "terser",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-native-get-item-layout-section-list",
      fileName: (format) => `index.${format}.js`,
    },
  },
});
