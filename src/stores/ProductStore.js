import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state() {
    return {
      products: [],
    };
  },

  getters: {
    productsValue(state) {
      return state.products;
    },
  },

  actions: {
    async loadProductsForClient(id) {
      await fetch(`http://localhost:8000/api/products?client=${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        });
    },
  },
});
