import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import ClientList from "../views/clients/ClientList.vue";
import AddClient from "../views/clients/AddClient.vue";
import DeleteClient from "../views/clients/DeleteClient.vue";

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
      component: ClientList,
    },

    {
      path: "/clients/add",
      name: "add-client",
      component: AddClient,
    },

    {
      path: "/clients/delete",
      name: "delete-client",
      component: DeleteClient,
    },
  ],
});

export default router;
