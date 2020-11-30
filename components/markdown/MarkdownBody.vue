<template>
  <div class="post-body">
    <hr />
    <nuxt-content :document="doc" />
    <hr />
  </div>
</template>

<script>
export default {
  props: ["doc"],
};
</script>

<style lang="scss" scoped>
.post-body {
  margin-top: 4rem;
}
</style>