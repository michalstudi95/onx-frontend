<template>
  <teleport to="body">
    <!-- Modal -->
    <div
      class="modal fade"
      :id="id"
      tabindex="-1"
      :aria-labelledby="title"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" :id="title">{{ title }}</h1>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ["id", "title"],
};
</script>
