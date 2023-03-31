<template>
  <div class="d-flex">
    <PageTitle title="Lista klientów" class="mb-5 me-3" />
    <LoadSpinner v-if="loading" />
  </div>

  <div class="d-flex justify-content-center mb-5">
    <div>
      <router-link class="btn btn-primary me-3" :to="{ name: 'all-clients' }"
        >Wszyscy klienci</router-link
      >

      <router-link class="btn btn-primary me-3" :to="{ name: 'individuals' }"
        >Klienci indywidualni</router-link
      >

      <router-link class="btn btn-primary" :to="{ name: 'companies' }"
        >Firmy</router-link
      >
    </div>
  </div>

  <RouterView />
</template>

<script>
import ClientCard from "../../../components/clients/ClientCard.vue";
import PageTitle from "../../../components/UI/PageTitle.vue";
import LoadSpinner from "../../../components/UI/LoadSpinner.vue";

export default {
  components: {
    ClientCard,
    PageTitle,
  },
};
</script>
