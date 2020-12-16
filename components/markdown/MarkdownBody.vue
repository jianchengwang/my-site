<template>
  <div class="markdown-body">
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
.markdown-body {
  margin-top: 4rem;
  text-align: left;
  color: #333;
}
</style>
