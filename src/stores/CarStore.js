import { defineStore } from "pinia";

export const useCarStore = defineStore("car", {
  state() {
    return {
      cars: [],
    };
  },

  getters: {
    carsValue(state) {
      return state.cars;
    },
  },

  actions: {
    async loadCars() {
      await fetch(`http://localhost:8000/api/cars`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.cars = data;
        });
    },
  },
});
