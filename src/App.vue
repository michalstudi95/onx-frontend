<template>
  <div class="container py-5">
    <div class="row d-flex justify-content-center">
      <TheNavigation class="col-6" />
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-9 mt-5 px-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import TheNavigation from "./components/layouts/TheNavigation.vue";

export default {
  components: {
    TheNavigation,
  },
};
</script>
