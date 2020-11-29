<template>
  <header class="post-header">
    <h1 class="post-title">
      {{ doc.title }}
    </h1>
    <div class="post-meta">
      <a href="/tag"><span>Tags &gt; </span> </a>
      <a v-for="(tag, index) in doc.tags" :key="tag" class="tag" :href="'/tag/' + tag + '/'"><span class="tag-name">#{{ tag }}</span>
        <span v-if="index < doc.tags.length-1"> </span>
      </a>
    </div>
    <div v-if="doc.img" class="post-img">
    </div>
  </header>
</template>

<script>
export default {
  props: ["doc"],
};
</script>

<style lang="scss" scoped>
.post-header {
  position: relative;
  text-align: center;
  .post-title {
    margin: 0;
    padding: 10px;
    font-size: 2rem;
    font-weight: 900;
    font-family: "Songti SC", "Noto Serif SC", STZhongsong, STKaiti, KaiTi,
      Roboto, serif;
  }
  .post-meta {
    font-size: 14px;
    font-style: italic;
    color: var(--hty-secondary-text-color);
  }
}
</style>