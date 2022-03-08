export default {
  head: {
    titleTemplate: "%s - NODEBIRD",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: "description", name: "description", content: "Meta description" }
    ]
  },
  modules: ["@nuxtjs/axios"],
  css: ["./assets/scss/app.scss"],
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/style-resources"],
  styleResources: {
    scss: ["./assets/scss/*.scss"]
  }
}
