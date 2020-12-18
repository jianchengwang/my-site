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
  mounted: function () {
    this.utils.initClipboard();
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "/css/clipboard-use.css",
      },
    ],
    script: [
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
      },
    ],
  },
};
</script>

<style lang="scss" scoped>
.markdown-body {
  margin-top: 4rem;
  text-align: left;
}
</style>
