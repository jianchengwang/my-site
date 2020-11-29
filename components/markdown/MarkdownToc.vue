<template>
  <ul>
    <li v-for="link of toc" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["toc"],
  computed: {
    tocItems: function () {
      let result = [];
      if (this.toc.length) {
        const level1_depth = this.toc[0].depth;
        let level1_toc;
        let level2_toc;
        let level3_toc;
        for (let i = 0; i < this.toc.length; i++) {
          let tocItem = this.toc[i];
          if (
            tocItem.depth < level1_depth ||
            tocItem.depth > level1_depth + 2
          ) {
            continue;
          }
          switch (tocItem.depth - level1_depth) {
            case 0:
              level1_toc = tocItem;
              level1_toc.no = result.length + 1;
              level1_toc.children = [];
              result.push(level1_toc);
              break;
            case 1:
              level2_toc = tocItem;
              level2_toc.children = [];
              level2_toc.no = `${level1_toc.no}.${
                level1_toc.children.length + 1
              }`;
              level1_toc.children.push(level2_toc);
              break;
            case 2:
              level3_toc = tocItem;
              level3_toc.children = [];
              level3_toc.no = `${level2_toc.no}.${
                level2_toc.children.length + 1
              }`;
              level2_toc.children.push(level3_toc);
              break;
            default:
              break;
          }
        }
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
// .post-toc {
//   line-height: 1.8;
//   padding: 1rem;
//   font-size: 1.1rem;
//   font-family: "Songti SC", "Noto Serif SC", STZhongsong, STKaiti, KaiTi, Roboto,
//     serif;
//   ol {
//     list-style: none;
//     text-align: left;
//     padding-left: 1rem;
//     margin: 0;
//     .toc-child {
//       font-size: 1rem;
//       overflow: hidden;
//       transition: max-height 0.6s ease-in;
//       max-height: 0;
//     }
//   }
// }

// ol {
//   display: block;
//   list-style-type: decimal;
//   margin-block-start: 1em;
//   margin-block-end: 1em;
//   margin-inline-start: 0px;
//   margin-inline-end: 0px;
//   padding-inline-start: 40px;
//   .toc-link {
//     color: #0078e7;
//   }
// }

// li {
//   display: list-item;
//   text-align: -webkit-match-parent;
// }

// a {
//   color: #0078e7;
//   text-decoration: none;
//   transition: color 0.1s;
// }
</style>