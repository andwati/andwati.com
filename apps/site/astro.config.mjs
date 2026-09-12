// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { buildLastmodMap, resolveContentDir } from "./lib-config/sitemap-lastmod.mjs";
import { siteConfig } from "./src/site.config.ts";

const lastmodMap = buildLastmodMap(resolveContentDir(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: siteConfig.baseUrl,
  integrations: [
    sitemap({
      // Every build re-crawls the actual rendered output, so the sitemap's
      // URL list always matches whatever pages/content exist right now — no
      // separate "regenerate the sitemap" step needed when content changes.
      // On top of that, <lastmod> is set from each entry's own
      // date/updated field (falling back to build time when unmapped),
      // instead of every URL just getting "whenever the site was last
      // built".
      serialize(item) {
        const lastmod = lastmodMap.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
