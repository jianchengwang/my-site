<template>
  <div class="main">
    <AppSideBar>
      <MarkdownToc :toc="doc.toc" />
    </AppSideBar>
    <MarkdownHeader :doc="doc" />
    <MarkdownBody :doc="doc" />
    <MarkdownNav :prev="prev" :next="next" />
  </div>
</template>

<script>
import AppSideBar from "@/components/layout/AppSideBar.vue";
import MarkdownHeader from "@/components/markdown/MarkdownHeader.vue";
import MarkdownBody from "@/components/markdown/MarkdownBody.vue";
import MarkdownToc from "@/components/markdown/MarkdownToc.vue";
import MarkdownNav from "@/components/markdown/MarkdownNav.vue";

export default {
  components: {
    AppSideBar,
    MarkdownHeader,
    MarkdownBody,
    MarkdownToc,
    MarkdownNav,
  },
  props: ["doc", "prev", "next"],
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en", options);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
