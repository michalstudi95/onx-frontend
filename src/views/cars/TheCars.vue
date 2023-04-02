<template>
  <PageTitle title="Lista samochodów" class="mb-5" />
  <LoadSpinner v-if="loading" />
  <table v-else class="table">
    <thead>
      <tr>
        <th scope="col">Rejestracja</th>
        <th scope="col">Marka</th>
        <th scope="col">Model</th>
        <th scope="col">Rok</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in carsValue" :key="c.id">
        <td>{{ c.registration }}</td>
        <td>{{ c.make }}</td>
        <td>{{ c.model }}</td>
        <td>{{ c.year }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useCarStore } from "../../stores/CarStore.js";
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
    ...mapState(useCarStore, ["carsValue"]),
  },

  async created() {
    this.loading = true;
    await this.loadCars();
    this.loading = false;
  },

  methods: {
    ...mapActions(useCarStore, ["loadCars"]),
  },
};
</script>
