import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      brand: {
        lighter: "#aaa0f8",
        light: "#8983f5",
        DEFAULT: "#6366f1",
        dark: "#5151bc",
        darker: "#3f3d89",
      },
    },
  },
});
