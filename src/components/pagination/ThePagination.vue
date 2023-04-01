<template>
  <nav>
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
export default {
  props: ["numberOfPages"],

  watch: {
    $route(value) {
      const page = value.query.page;
      this.setPageBadgeActive(page);
    },
  },

  updated() {
    const page = this.$route.query.page;
    if (page) this.setPageBadgeActive(page);
  },

  methods: {
    prevPage() {
      this.$emit("prev-page");
    },

    setPage(page) {
      this.$emit("set-page", page);
    },

    nextPage() {
      this.$emit("next-page");
    },

    setPageBadgeActive(page) {
      const badges = document.querySelectorAll(".pagination .page-item");
      for (let badge of badges) {
        badge.classList.remove("active");
      }

      for (let badge of badges) {
        if (badge.textContent === page) badge.classList.add("active");
      }
    },
  },
};
</script>
