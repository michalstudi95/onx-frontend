import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import ClientList from "../views/clients/ClientList.vue";
import ClientDetail from "../views/clients/ClientDetail.vue";
//managing clients
import AddClient from "../views/clients/manage/AddClient.vue";
import EditClient from "../views/clients/manage/EditClient.vue";
import DeleteClient from "../views/clients/manage/DeleteClient.vue";
//employees
import TheEmployees from "../views/employees/TheEmployees.vue";
//cars
import TheCars from "../views/cars/TheCars.vue";

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
      path: "/clients/:id/",
      props: true,
      name: "client-detail",
      component: ClientDetail,
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

    {
      path: "/employees",
      name: "employees",
      component: TheEmployees,
    },

    {
      path: "/cars",
      name: "cars",
      component: TheCars,
    },
  ],
});

export default router;
