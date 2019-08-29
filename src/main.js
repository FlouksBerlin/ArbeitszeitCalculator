import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import App from "./App.vue";

import DecimalTimeFilter from "@/filter/time";
Vue.filter("decimalTime", DecimalTimeFilter);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
