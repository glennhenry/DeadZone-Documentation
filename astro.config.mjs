// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeObsidian from "starlight-theme-obsidian";
import vercel from "@astrojs/vercel";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  adapter: vercel({ imageService: true }),
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" },
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
    ],
  },
  integrations: [
    starlight({
      plugins: [starlightThemeObsidian()],
      favicon: "icon.ico",
      customCss: ["./src/assets/custom.css"],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 6 },
      credits: true,
      lastUpdated: true,
      title: "TLSDZ",
      editLink: {
        baseUrl:
          "https://github.com/glennhenry/DeadZone-Documentation/edit/main/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/SulivanM/DeadZone-Private-Server",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/glennhenry/DeadZone-Documentation",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/Q5dTKrPmfq",
        },
      ],
      sidebar: [
        { label: "Intro", slug: "index" },
        { label: "Glossary", slug: "glossary" },
        { label: "preloader/Main.as", slug: "preloader-main" },
        { label: "core/Main.as", slug: "core-main" },
        {
          label: "playerio",
          collapsed: true,
          items: [
            {
              label: "utils",
              collapsed: true,
              items: [
                { label: "HTTPChannel", slug: "playerio/utils/httpchannel" },
              ],
            },
            { label: "PlayerIO", slug: "playerio/playerio" },
            { label: "GameFS", slug: "playerio/gamefs" },
            {
              label: "PublishingNetwork",
              slug: "playerio/publishingnetwork",
            },
          ],
        },
        {
          label: "thelaststand.app",
          collapsed: true,
          items: [
            {
              label: "network",
              collapsed: true,
              items: [
                {
                  label: "PlayerIOConnector",
                  slug: "thelaststand.app/network/playerioconnector",
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
