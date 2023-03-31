import { defineStore } from "pinia";

export const useClientStore = defineStore("client", {
  state() {
    return {
      clients: [],
      clientType: "",
      currentPage: 1,
      lastPage: null,
      prevPageUrl: "",
      nextPageUrl: "",
    };
  },

  getters: {
    clientList(state) {
      return state.clients;
    },

    numberOfPages(state) {
      return state.lastPage;
    },
  },

  actions: {
    async loadClientsForPreviousPage() {
      await fetch(this.prevPageUrl)
        .then((response) => response.json())
        .then((data) => {
          if (this.currentPage > 1) this.currentPage--;
          this.clients = data.data;
          this.prevPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&page=${
            this.currentPage === 1 ? this.currentPage : this.currentPage - 1
          }`;
          this.nextPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&page=${this.currentPage + 1}`;
        });

      console.log("Prev");
      console.log(this.prevPageUrl);
      console.log(this.nextPageUrl);
      console.log(this.currentPage);
    },

    async loadClients(type, page) {
      this.clientType = type;
      this.currentPage = page;

      await fetch(
        `http://127.0.0.1:8000/api/clients?type=${this.clientType}&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.clients = data.data;
          this.currentPage = data.current_page;
          this.lastPage = data.last_page;

          this.prevPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&page=${
            this.currentPage === 1 ? this.currentPage : this.currentPage - 1
          }`;
          this.nextPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&page=${
            this.currentPage === this.lastPage
              ? this.currentPage
              : this.currentPage + 1
          }`;
        });
      console.log("Load");
      console.log(this.prevPageUrl);
      console.log(this.nextPageUrl);
      console.log(this.currentPage);
    },

    async loadClientsForNextPage() {
      await fetch(this.nextPageUrl)
        .then((response) => response.json())
        .then((data) => {
          if (this.currentPage < this.lastPage) this.currentPage++;
          this.clients = data.data;
          this.prevPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&page=${this.currentPage - 1}`;
          this.nextPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&page=${
            this.currentPage === this.lastPage
              ? this.currentPage
              : this.currentPage + 1
          }`;
        });
      console.log("Next");
      console.log(this.prevPageUrl);
      console.log(this.nextPageUrl);
      console.log(this.currentPage);
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
