<template>
  <div class="d-flex flex-column mb-3">
    <select
      v-model="sort"
      class="form-select form-select-sm align-self-end"
      style="max-width: 10rem"
    >
      <option selected value="desc">od najnowszych</option>
      <option value="asc">od najstarszych</option>
    </select>
  </div>
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
      sort: "desc",
      loading: false,
    };
  },

  data() {
    return {
      sort: "desc",
      loading: false,
    };
  },

  computed: {
    ...mapState(useClientStore, ["clientList"]),
    ...mapState(useClientStore, ["clientTypeValue"]),
    ...mapState(useClientStore, ["currentPageValue"]),
  },

  watch: {
    async sort(value) {
      this.loading = true;
      this.$router.push({
        name: "client-list",
        query: {
          type: this.clientTypeValue,
          sort: value,
          page: "1",
        },
      });
      await this.loadClientsByFilters("company", value, "1");
      this.loading = false;
    },
  },

  async created() {
    this.loading = true;
    await this.loadClientsByFilters(
      this.$route.query.type,
      this.$route.query.sort,
      this.$route.query.page
    );

    if (this.$route.query.sort === "asc") this.sort = "asc";
    if (this.$route.query.sort === "desc") this.sort = "desc";
    this.loading = false;
  },

  methods: {
    ...mapActions(useClientStore, ["loadClientsForPreviousPage"]),
    ...mapActions(useClientStore, ["loadClientsByFilters"]),
    ...mapActions(useClientStore, ["loadClientsForNextPage"]),

    async setPrevPage() {
      this.loading = true;
      await this.loadClientsForPreviousPage();
      this.loading = false;
    },

    async setPage(page) {
      this.loading = true;
      await this.loadClientsByFilters("company", this.sort, page);
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
