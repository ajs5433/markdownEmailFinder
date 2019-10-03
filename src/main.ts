import Vue from "vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from 'element-ui/lib/locale/lang/en'
import App from "./App.vue";
import VueShowdown from 'vue-showdown'

Vue.use(VueShowdown, {})
// Vue.component('VueShowdown',VueShowdown)

Vue.use(ElementUI, { locale })
// Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
