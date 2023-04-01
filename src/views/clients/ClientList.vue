<template>
  <PageTitle title="Lista klientów" class="mb-5 me-3" />

  <div class="d-flex justify-content-center mb-3">
    <div>
      <router-link
        :to="{ query: { type: 'all', sort: 'desc', page: '1' } }"
        class="btn btn-primary me-3"
      >
        Wszyscy klienci
      </router-link>

      <router-link
        :to="{ query: { type: 'individual', sort: 'desc', page: '1' } }"
        class="btn btn-primary me-3"
      >
        Klienci indywidualni
      </router-link>

      <router-link
        :to="{ query: { type: 'company', sort: 'desc', page: '1' } }"
        class="btn btn-primary"
      >
        Firmy
      </router-link>
    </div>
  </div>

  <div class="d-flex flex-column mb-3">
    <select
      @change="loadClientsBySortFilter"
      v-model="sort"
      class="form-select form-select-sm align-self-end"
      style="max-width: 10rem"
    >
      <option value="desc">od najnowszych</option>
      <option value="asc">od najstarszych</option>
    </select>
  </div>

  <LoadSpinner v-if="loading" />
  <ClientCard
    v-else
    v-for="client in clientsValue"
    :key="client.id"
    :client="client"
  />

  <div class="d-flex justify-content-center">
    <ThePagination
      @prev-page="prevPage"
      @set-page="setPage"
      @next-page="nextPage"
      :numberOfPages="lastPageValue"
    />
  </div>
</template>

<script>
import { useClientStore } from "../../stores/ClientStore.js";
import { mapState, mapActions } from "pinia";
//components used in template
import PageTitle from "../../components/UI/PageTitle.vue";
import ClientCard from "../../components/clients/ClientCard.vue";
import ThePagination from "../../components/pagination/ThePagination.vue";
import LoadSpinner from "../../components/UI/LoadSpinner.vue";

export default {
  components: {
    PageTitle,
    ClientCard,
    ThePagination,
    LoadSpinner,
  },

  data() {
    return {
      sort: "desc",
      loading: false,
    };
  },

  computed: {
    ...mapState(useClientStore, ["clientsValue"]),
    ...mapState(useClientStore, ["lastPageValue"]),
  },

  watch: {
    async $route(value) {
      const type = value.query.type;
      const sort = value.query.sort;
      const page = value.query.page;
      this.loadClients(type, sort, page);
    },
  },

  created() {
    const type = this.$route.query.type;
    const sort = this.$route.query.sort;
    const page = this.$route.query.page;
    this.loadClients(type, sort, page);
  },

  mounted() {
    const sort = this.$route.query.sort;
    if (sort === "asc") this.sort = "asc";
    else this.sort = "desc";
  },

  methods: {
    ...mapActions(useClientStore, ["loadClientsByFilters"]),

    async loadClients(type, sort, page) {
      this.loading = true;
      await this.loadClientsByFilters(type, sort, page);
      this.$router.push({
        name: "client-list",
        query: {
          type: type,
          sort: sort,
          page: page,
        },
      });
      this.loading = false;
    },

    loadClientsBySortFilter(e) {
      const sort = e.target.value;
      const type = this.$route.query.type;
      this.loadClients(type, sort, 1);
    },

    prevPage() {
      const type = this.$route.query.type;
      const sort = this.$route.query.sort;
      const page = this.$route.query.page;
      this.$router.push({
        name: "client-list",
        query: {
          type: type,
          sort: sort,
          page: parseInt(page) - 1 > 1 ? parseInt(page) - 1 : 1,
        },
      });
    },

    setPage(page) {
      const type = this.$route.query.type;
      const sort = this.$route.query.sort;
      this.$router.push({
        name: "client-list",
        query: {
          type: type,
          sort: sort,
          page: page,
        },
      });
    },

    nextPage() {
      const type = this.$route.query.type;
      const sort = this.$route.query.sort;
      const page = this.$route.query.page;

      this.$router.push({
        name: "client-list",
        query: {
          type: type,
          sort: sort,
          page:
            parseInt(page) + 1 < this.lastPageValue
              ? parseInt(page) + 1
              : this.lastPageValue,
        },
      });
    },
  },
};
</script>
