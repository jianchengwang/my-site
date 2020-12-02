<template>
  <div>
    <h1 class="main-title">#All Tag</h1>
    <a v-for="tag in tags" :key="tag.name" :href="'/tag/' + tag.name + '/'" class="tag-cloud-item" :style="'font-size:' + (1 + tag.cnt/10) + 'em'">{{ tag.name }}</a>
  </div>
</template>

<script>
export default {
  props: ["tags"],
};
</script>

<style lang="scss" scoped>
</style>
