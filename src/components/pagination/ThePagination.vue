<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li @click="prevPage" class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in numberOfPages"
        @click="setPage(page)"
        class="page-item"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>
      <li @click="nextPage" class="page-item">
        <router-link
          :to="{
            query: {
              type: this.clientTypeValue,
              sort: this.sortValue,
              page: this.currentPageValue,
            },
          }"
          class="page-link"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useClientStore } from "../../stores/ClientStore.js";
import { mapState } from "pinia";

export default {
  props: {
    clients: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapState(useClientStore, ["numberOfPages"]),
    ...mapState(useClientStore, ["clientTypeValue"]),
    ...mapState(useClientStore, ["sortValue"]),
    ...mapState(useClientStore, ["currentPageValue"]),
  },

  watch: {
    currentPageValue(page) {
      this.$route.query.page = page;
    },
  },

  methods: {
    prevPage() {
      this.$emit("prev-page");
    },

    setPage(page) {
      this.$emit("current-page", page);
    },

    nextPage() {
      this.$emit("next-page");
    },
  },
};
</script>
