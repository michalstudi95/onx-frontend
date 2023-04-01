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
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
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
    ...mapState(useClientStore, ["lastPageValue"]),
  },

  methods: {
    prevPage() {
      this.$emit("prev-page");
      this.$router.push({
        name: "client-list",
        query: {
          type: this.clientTypeValue,
          sort: this.sortValue,
          page: this.currentPageValue > 1 ? this.currentPageValue - 1 : 1,
        },
      });
    },

    setPage(page) {
      this.$emit("current-page", page);
      this.$router.push({
        name: "client-list",
        query: {
          type: this.clientTypeValue,
          sort: this.sortValue,
          page: page,
        },
      });
    },

    nextPage() {
      this.$emit("next-page");
      this.$router.push({
        name: "client-list",
        query: {
          type: this.clientTypeValue,
          sort: this.sortValue,
          page:
            this.currentPageValue === this.lastPageValue
              ? this.currentPageValue
              : this.currentPageValue + 1,
        },
      });
    },
  },
};
</script>
