<template>
  <div>
    <div v-if="postId && !tags">
      <MarkdownMain :doc="doc" :prev="prev" :next="next" />
    </div>
    <div v-if="!postId && !tags">
      <PostList :docs="docs" :listTitle="listTitle" />
    </div>
    <div v-if="tags">
      <PostTags :tags="tags" />
    </div>
  </div>
</template>
<script>
import MarkdownMain from "@/components/markdown/MarkdownMain.vue";
import PostList from "@/components/post/PostList.vue";
import PostTags from "@/components/post/PostTags.vue";

export default {
  components: {
    MarkdownMain,
    PostList,
    PostTags,
  },
  async asyncData({ $content, params }) {
    let postPath = params.post;
    let postId = params.id;

    if (postPath === "tag") {
      if (postId) {
        const tag = postId;
        const docs = await $content("", { deep: true })
          .only(["title", "description", "img", "slug", "author", "createdAt"])
          .where({ tags: { $contains: tag } })
          .sortBy("createdAt", "asc")
          .fetch();
        return {
          docs,
          listTitle: "#" + tag,
          postId: undefined,
          tags: undefined,
        };
      } else {
        let tagMap = new Map();
        const docs = await $content("", { deep: true }).only(["tags"]).fetch();
        docs.forEach((doc) => {
          if (doc.tags) {
            for (let i = 0; i < doc.tags.length; i++) {
              if (tagMap.has(doc.tags[i])) {
                tagMap.set(doc.tags[i], tagMap.get(doc.tags[i]) + 1);
              } else {
                tagMap.set(doc.tags[i], 1);
              }
            }
          }
        });
        let tags = [];
        tagMap.forEach((v, k) => {
          tags.push({ name: k, cnt: v });
        });
        return {
          tags,
          postId: undefined,
        };
      }
    } else {
      if (postId) {
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
      } else {
        const docs = await $content(postPath)
          .only(["title", "description", "img", "slug", "author", "createdAt"])
          .sortBy("createdAt", "desc")
          .fetch();
        return {
          docs,
          listTitle: postPath.toUpperCase(),
          postId,
          tags: undefined,
        };
      }
    }
  },
};
</script>