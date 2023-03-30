import { defineStore } from "pinia";

export const useClientStore = defineStore("client", {
  state() {
    return {
      clients: [],
    };
  },

  getters: {
    clientList(state) {
      return state.clients;
    },
  },

  actions: {
    async loadClients() {
      await fetch("http://127.0.0.1:8000/api/clients")
        .then((response) => response.json())
        .then((data) => {
          this.clients = data;
        });

      console.log(this.clients);
    },
  },
});
