import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import AddClient from "../views/clients/AddClient.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/clients",
      name: "clients",
      //component: HomeView,
      children: [{ path: "add", name: "add-client", component: AddClient }],
    },
  ],
});

export default router;
