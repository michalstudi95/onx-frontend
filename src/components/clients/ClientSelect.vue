<template>
  <select
    @change="selectClient"
    class="form-select mb-5"
    aria-label="Default select example"
  >
    <option selected value="none">...</option>
    <option v-for="client in clientList" :key="client.id" :value="client.id">
      {{ formatClientForSelect(client) }}
    </option>
  </select>
</template>

<script>
import { useClientStore } from "../../stores/ClientStore.js";
import { mapState, mapActions, mapStores } from "pinia";

export default {
  emits: ["select-client"],

  props: ["toUpdateSelect"],

  computed: {
    ...mapState(useClientStore, ["clientList"]),
    ...mapStores(useClientStore),
  },

  watch: {
    async toUpdateSelect() {
      this.loading = true;
      await this.loadClients();
      this.loading = false;
    },
  },

  async created() {
    this.loading = true;
    await this.loadClients();
    this.loading = false;
  },

  methods: {
    ...mapActions(useClientStore, ["loadClients"]),

    selectClient(e) {
      const id = e.target.value;
      const client = this.clientList.find((c) => c.id == id);
      this.$emit("select-client", client);
    },

    formatClientForSelect(client) {
      if (client.client_type === "individual") {
        return (
          client.first_name + " " + client.last_name + " - " + "indywidualny"
        );
      } else {
        //company
        return client.company_name + " - " + "firma";
      }
    },
  },
};
</script>
