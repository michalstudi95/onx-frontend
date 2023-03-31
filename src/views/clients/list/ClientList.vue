<template>
  <PageTitle title="Lista klientów" class="mb-5 me-3" />

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
import PageTitle from "../../../components/UI/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
};
</script>
