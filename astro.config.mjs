import { defineConfig } from "astro/config";
import analogjsangular from "@analogjs/astro-angular";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    analogjsangular({
      vite: {
        inlineStylesExtension: "scss|sass|less",
      },
    }),
    tailwind(),
  ],
  vite: {
    ssr: {
      // transform these packages during SSR. Globs supported
      noExternal: ["@rx-angular/**"],
    },
  },
});
