import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employee", {
  state() {
    return {
      employees: [],
    };
  },

  getters: {
    employeesValue(state) {
      return state.employees;
    },
  },

  actions: {
    async loadEmployees() {
      await fetch(`http://127.0.0.1:8000/api/employees`)
        .then((response) => response.json())
        .then((data) => {
          this.employees = data;
        });
    },
  },
});
