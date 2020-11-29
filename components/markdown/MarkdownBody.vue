<template>
  <div class="post-body prose prose-sm sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto">
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