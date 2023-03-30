<template>
  <button :type="type" class="btn btn-primary">{{ title }}</button>
</template>

<script>
export default {
  props: ["type", "title"],
};
</script>
