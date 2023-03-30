<template>
  <div class="container py-5">
    <div class="row d-flex justify-content-center">
      <TheNavigation class="col-6" />
    </div>
    <div class="row d-flex justify-content-center">
      <RouterView class="col-6 mt-5 px-0" />
    </div>
  </div>
</template>

<script>
import { useClientStore } from "./stores/ClientStore";
import { mapState, mapActions } from "pinia";

import TheNavigation from "./components/layouts/TheNavigation.vue";

export default {
  components: {
    TheNavigation,
  },
};
</script>
