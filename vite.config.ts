import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    minify: false,
    lib: {
      entry: "./src/index.ts",
      name: "react-native-get-item-layout-section-list",
      fileName: (format) => `index.${format}.js`,
    },
  },
});
