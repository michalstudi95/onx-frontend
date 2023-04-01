import { defineStore } from "pinia";

export const useClientStore = defineStore("client", {
  state() {
    return {
      clients: [],
      clientType: "",
      currentPage: null,
      sort: "",
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

    clientTypeValue(state) {
      return state.clientType;
    },

    currentPageValue(state) {
      return state.currentPage;
    },

    sortValue(state) {
      return state.sort;
    },

    lastPageValue(state) {
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
          }&sort=${this.sort}&page=${
            this.currentPage === 1 ? this.currentPage : this.currentPage - 1
          }`;
          this.nextPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&sort=${this.sort}&page=${this.currentPage + 1}`;
        });
    },

    async loadClients(type, sort, page) {
      this.clientType = type;
      this.sort = sort;

      await fetch(
        `http://127.0.0.1:8000/api/clients?type=${this.clientType}&sort=${sort}&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.clients = data.data;
          this.lastPage = data.last_page;
          this.currentPage = data.current_page;

          this.prevPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&sort=${this.sort}&page=${
            this.currentPage === 1 ? this.currentPage : this.currentPage - 1
          }`;
          this.nextPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&sort=${this.sort}&page=${
            this.currentPage === this.lastPage
              ? this.currentPage
              : this.currentPage + 1
          }`;
        });
    },

    async loadClientsForNextPage() {
      await fetch(this.nextPageUrl)
        .then((response) => response.json())
        .then((data) => {
          if (this.currentPage < this.lastPage) this.currentPage++;
          this.clients = data.data;
          this.prevPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&sort=${this.sort}&page=${this.currentPage - 1}`;
          this.nextPageUrl = `http://127.0.0.1:8000/api/clients?type=${
            this.clientType
          }&sort=${this.sort}&page=${
            this.currentPage === this.lastPage
              ? this.currentPage
              : this.currentPage + 1
          }`;
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
