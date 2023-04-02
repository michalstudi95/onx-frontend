<template>
  <PageTitle title="Lista pracowników" class="mb-5" />
  <LoadSpinner v-if="loading" />
  <table v-else class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Imię</th>
        <th scope="col">Nazwisko</th>
        <th scope="col">Adres</th>
        <th scope="col">Telefon</th>
        <th scope="col">E-mail</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="e in employeesValue" :key="e.id">
        <td>{{ e.id }}</td>
        <td>{{ e.first_name }}</td>
        <td>{{ e.last_name }}</td>
        <td>{{ e.address }}</td>
        <td>{{ e.phone }}</td>
        <td>{{ e.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useEmployeeStore } from "../../stores/EmployeeStore.js";
import { mapState, mapActions } from "pinia";

import PageTitle from "../../components/UI/PageTitle.vue";
import LoadSpinner from "../../components/UI/LoadSpinner.vue";

export default {
  components: {
    PageTitle,
    LoadSpinner,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState(useEmployeeStore, ["employeesValue"]),
  },

  async created() {
    this.loading = true;
    await this.loadEmployees();
    this.loading = false;
  },

  methods: {
    ...mapActions(useEmployeeStore, ["loadEmployees"]),
  },
};
</script>
