import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

//client list
import ClientList from "../views/clients/list/ClientList.vue";
import AllClients from "../views/clients/list/AllClients.vue";
import TheIndividuals from "../views/clients/list/TheIndividuals.vue";
import TheCompanies from "../views/clients/list/TheCompanies.vue";
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
      path: "/client-list",
      component: ClientList,
      redirect: { name: "all-clients" },

      children: [
        {
          path: "all",
          name: "all-clients",
          component: AllClients,
        },

        {
          path: "individuals",
          name: "individuals",
          component: TheIndividuals,
        },

        {
          path: "companies",
          name: "companies",
          component: TheCompanies,
        },
      ],
    },

    {
      path: "/client-manage/add",
      name: "add-client",
      component: AddClient,
    },

    {
      path: "/client-manage/edit",
      name: "edit-client",
      component: EditClient,
    },

    {
      path: "/client-manage/delete",
      name: "delete-client",
      component: DeleteClient,
    },
  ],
});

export default router;
