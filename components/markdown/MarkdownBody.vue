<template>
  <div>
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
</style>
