<template>
  <div class="main flex-1">
    <h1 class="list-title">#All Tag</h1>
    <a v-for="tag in tags" :key="tag.name" :href="'/tag/' + tag.name + '/'" class="tag-cloud-item" :style="'font-size:' + (1 + tag.cnt/10) + 'em'">{{ tag.name }}</a>
  </div>
</template>

<script>
export default {
  props: ["tags"],
};
</script>

<style lang="scss" scoped>
.tag-cloud-item {
  margin: 0.5rem;
  display: inline-block;
}
</style>