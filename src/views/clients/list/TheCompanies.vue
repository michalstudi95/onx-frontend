<template>
  <LoadSpinner v-if="loading" />
  <ClientCard
    v-else
    v-for="client in clientList"
    :key="client.id"
    :client="client"
  />
  <div class="d-flex justify-content-center">
    <ThePagination
      :clients="clientList"
      @prev-page="setPrevPage"
      @current-page="setPage"
      @next-page="setNextPage"
    />
  </div>
</template>
<script>
import { useClientStore } from "../../../stores/ClientStore.js";
import { mapState, mapActions } from "pinia";
//componets used in template
import ClientCard from "../../../components/clients/ClientCard.vue";
import LoadSpinner from "../../../components/UI/LoadSpinner.vue";
import ThePagination from "../../../components/pagination/ThePagination.vue";

export default {
  components: {
    ClientCard,
    LoadSpinner,
    ThePagination,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState(useClientStore, ["clientList"]),
  },

  async created() {
    this.loading = true;
    await this.loadClients("company", this.currentPage);
    this.loading = false;
  },

  methods: {
    ...mapActions(useClientStore, ["loadClientsForPreviousPage"]),
    ...mapActions(useClientStore, ["loadClients"]),
    ...mapActions(useClientStore, ["loadClientsForNextPage"]),

    async setPrevPage() {
      this.loading = true;
      await this.loadClientsForPreviousPage();
      this.loading = false;
    },

    async setPage(page) {
      this.loading = true;
      await this.loadClients("company", page);
      this.loading = false;
    },

    async setNextPage() {
      this.loading = true;
      await this.loadClientsForNextPage();
      this.loading = false;
    },
  },
};
</script>
