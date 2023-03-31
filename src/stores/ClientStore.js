import { defineStore } from "pinia";

export const useClientStore = defineStore("client", {
  state() {
    return {
      clients: [],
    };
  },

  getters: {
    allClients(state) {
      return state.clients.reverse();
    },

    individuals(state) {
      const clients = state.clients.filter(
        (client) => client.client_type === "individual"
      );
      return clients.reverse();
    },

    companies(state) {
      const clients = state.clients.filter(
        (client) => client.client_type === "company"
      );
      return clients.reverse();
    },
  },

  actions: {
    async loadClients() {
      await fetch("http://127.0.0.1:8000/api/clients")
        .then((response) => response.json())
        .then((data) => {
          this.clients = data;
        });
    },

    addClientToStore(client) {
      this.clients.push(client);
    },

    deleteClientFromStore(id) {
      const index = this.clients.findIndex((client) => client.id === id);
      this.clients.splice(index, 1);
    },
  },
});
