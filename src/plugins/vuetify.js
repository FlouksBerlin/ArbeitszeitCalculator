import "@mdi/font/css/materialdesignicons.css";
// import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme: {
    themes: {
      light: {
        primary: colors.teal,
        secondary: colors.amber.darken3,
        accent: colors.purple,
        error: colors.red.darken2
      },
      dark: false
    }
  }
});
