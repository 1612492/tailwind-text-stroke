import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "tailwindcss-text-stroke",
      fileName: "tailwindcss-text-stroke",
    },
    rollupOptions: {
      external: ["tailwindcss"],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
