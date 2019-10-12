import Vue from "vue";
import Router from "vue-router";
import NotificationsPage from "./views/NotificationsPage.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "home",
      component: NotificationsPage
    },
    {
      path: "/import",
      name: "import",
      component: () => import("./views/ImportPage.vue")
    },
    {
      path: "/templates",
      name: "templates",
      component: () => import("./views/TemplatesPage.vue")
    },
    {
      path: "/about",
      name: "about",

      component: () =>
        import( "./views/About.vue")
    }
  ]
});
