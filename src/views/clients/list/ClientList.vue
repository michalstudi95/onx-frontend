<template>
  <PageTitle title="Lista klientów" class="mb-5 me-3" />

  <div class="d-flex justify-content-center mb-3">
    <div>
      <router-link
        :to="{ query: { type: 'all', sort: 'desc', page: '1' } }"
        @click="setComponent('all-clients')"
        class="btn btn-primary me-3"
      >
        Wszyscy klienci
      </router-link>

      <router-link
        :to="{ query: { type: 'individual', sort: 'desc', page: '1' } }"
        @click="setComponent('the-individuals')"
        class="btn btn-primary me-3"
      >
        Klienci indywidualni
      </router-link>

      <router-link
        :to="{ query: { type: 'company', sort: 'desc', page: '1' } }"
        @click="setComponent('the-companies')"
        class="btn btn-primary"
      >
        Firmy
      </router-link>
    </div>
  </div>

  <component :is="component"></component>
</template>

<script>
import PageTitle from "../../../components/UI/PageTitle.vue";
//dynamic components
import AllClients from "./AllClients.vue";
import TheIndividuals from "./TheIndividuals.vue";
import TheCompanies from "./TheCompanies.vue";

export default {
  components: {
    PageTitle,
    AllClients,
    TheIndividuals,
    TheCompanies,
  },

  data() {
    return {
      component: "all-clients",
    };
  },

  methods: {
    setComponent(cmp) {
      this.component = cmp;
    },
  },
};
</script>
