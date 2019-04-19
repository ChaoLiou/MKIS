import pkg from "./package";
import { name } from "./revision.json";

export default {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: `${pkg.name}-${name}`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/vue-dayjs.js",
    "~/plugins/vue-underscore.js",
    "~/plugins/vue-i18n.js",
    "~/plugins/vue-fontawesome.js",
    "~/plugins/vue-querystring.js"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt"
  ],
  bootstrapVue: {
    componentPlugins: [
      "Form",
      "FormTextarea",
      "FormInput",
      "FormSelect",
      "Badge",
      "Button",
      "FormCheckbox",
      "FormFile",
      "Modal",
      "ButtonGroup",
      "Layout",
      "FormGroup",
      "FormRadio",
      "Alert",
      "Link",
      "ListGroup",
      "Spinner"
    ],
    directivePlugins: []
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    analyze: false,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
