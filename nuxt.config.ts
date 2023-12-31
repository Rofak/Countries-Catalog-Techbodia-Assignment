// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/eslint-module", "@nuxt-alt/http", "@nuxt/ui"],
  ssr: false,
  app: {
    baseURL: "/Countries-Catalog-Techbodia-Assignment/",
    buildAssetsDir: "assets",
  },
});
