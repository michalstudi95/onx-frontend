import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

//client list
import ClientList from "../views/clients/ClientList.vue";
//managing clients
import AddClient from "../views/clients/manage/AddClient.vue";
import EditClient from "../views/clients/manage/EditClient.vue";
import DeleteClient from "../views/clients/manage/DeleteClient.vue";

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
      name: "client-list",
      component: ClientList,
    },

    {
      path: "/clients/manage/add",
      name: "add-client",
      component: AddClient,
    },

    {
      path: "/clients/manage/edit",
      name: "edit-client",
      component: EditClient,
    },

    {
      path: "/clients/manage/delete",
      name: "delete-client",
      component: DeleteClient,
    },
  ],
});

export default router;
