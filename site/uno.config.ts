import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetScrollbar(),
    presetWebFonts({
      fonts: { sans: "Lato" },
    }),
  ],
  transformers: [transformerVariantGroup()],
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
