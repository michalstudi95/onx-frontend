<template>
  <LoadSpinner v-if="loading" />
  <ClientCard
    v-else
    v-for="client in individuals"
    :key="client.id"
    :client="client"
  />
</template>
<script>
import { useClientStore } from "../../../stores/ClientStore.js";
import { mapState, mapActions } from "pinia";
//componets used in template
import ClientCard from "../../../components/clients/ClientCard.vue";
import LoadSpinner from "../../../components/UI/LoadSpinner.vue";

export default {
  components: {
    ClientCard,
    LoadSpinner,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState(useClientStore, ["individuals"]),
  },

  async created() {
    this.loading = true;
    await this.loadClients();
    this.loading = false;
  },

  methods: {
    ...mapActions(useClientStore, ["loadClients"]),
  },
};
</script>
