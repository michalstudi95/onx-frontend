<template>
  <LoadSpinner v-if="loading" />
  <select
    v-else
    @change="selectClient"
    class="form-select mb-5"
    aria-label="Default select example"
  >
    <option selected value="none">...</option>
    <option v-for="client in clients" :key="client.id" :value="client.id">
      {{ formatClientForSelect(client) }}
    </option>
  </select>
</template>

<script>
import { useClientStore } from "../../stores/ClientStore.js";
import { mapState, mapActions } from "pinia";

import LoadSpinner from "../UI/LoadSpinner.vue";

export default {
  components: {
    LoadSpinner,
  },

  emits: ["select-client", "update-select"],

  props: ["updateSelect"],

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState(useClientStore, ["clientsValue"]),
    clients() {
      return this.clientsValue.length > 0 ? this.clientsValue.reverse() : [];
    },
  },

  watch: {
    async updateSelect(value) {
      if (value) {
        this.loading = true;
        await this.loadAllClients();
        this.$emit("update-select");
        this.loading = false;
      }
    },
  },

  async created() {
    this.loading = true;
    await this.loadAllClients();
    this.loading = false;
  },

  methods: {
    ...mapActions(useClientStore, ["loadAllClients"]),

    selectClient(e) {
      const id = e.target.value;
      const client = this.clientsValue.find((c) => c.id == id);
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
