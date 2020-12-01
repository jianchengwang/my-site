<template>
  <div>
    <div v-if="postId">
      <MarkdownMain :doc="doc" :prev="prev" :next="next" />
    </div>
    <div v-if="!postId">
      <PostList :postPath="postPath" :docs="docs" :listTitle="listTitle" />
    </div>
  </div>
</template>
<script>
import MarkdownMain from "@/components/markdown/MarkdownMain.vue";
import PostList from "@/components/post/PostList.vue";

export default {
  components: {
    MarkdownMain,
    PostList,
  },
  async asyncData({ $content, params }) {
    let postPath = params.post;
    let postId = params.id;

    if (postPath === "tag") {
      const tag = postId;
      const docs = await $content("", { deep: true })
        .only(["title", "description", "img", "slug", "author", "createdAt"])
        .where({ tags: { $contains: tag } })
        .sortBy("createdAt", "asc")
        .fetch();
      return {
        postPath: postPath,
        docs,
        listTitle: "#" + tag,
        postId: undefined,
        tags: undefined,
      };
    } else {
      const doc = await $content(postPath, postId).fetch();
      const [prev, next] = await $content(postPath)
        .only(["title", "slug"])
        .sortBy("createdAt", "asc")
        .surround(postId)
        .fetch();
      return {
        doc,
        prev,
        next,
        postId,
        tags: undefined,
      };
    }
  },
};
</script>