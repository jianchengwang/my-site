<template>
  <div class="main post-list flex-1">
    <h1 class="list-title">{{ listTitle }}</h1>
    <input class="list-search" type="text" placeholder="Search..." v-model="searchKey" />
    <div v-if="docsYear.length">
      <div class="list-group" v-for="dy in docsYear" :key="dy.year">
        <h2 class="list-year">{{ dy.year }}</h2>
        <ul class="list-part">
          <li class="list-item" v-for="doc in dy.docs" :key="doc.title"><a :href="doc.path">
              <div class="list-item-title">
                <span>
                  {{ doc.title }} {{ doc.path }}
                  <span :datetime="doc.createdAt" class="list-item-time">{{ doc.createdAt }}</span>
                </span>
                <span :datetime="doc.createdAt" class="list-item-time">{{ doc.createdAt }}</span>
              </div>
            </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postPath", "docs", "listTitle"],
  data() {
    return {
      searchKey: "",
    };
  },
  computed: {
    docsYear: function () {
      let result = [];
      let filterDocs = this.docs.filter((doc) =>
        doc.title.toLowerCase().includes(this.searchKey.toLowerCase())
      );
      if (filterDocs.length) {
        let yearTmp = this.utils.formatDate(filterDocs[0].createdAt, "YY");
        let item = filterDocs[0];
        item.createdAt = this.utils.formatDate(item.createdAt);
        result.push({ year: yearTmp, docs: [filterDocs[0]] });
        for (let i = 1; i < filterDocs.length; i++) {
          item = filterDocs[i];
          item.createdAt = this.utils.formatDate(item.createdAt);
          let itemYear = this.utils.formatDate(filterDocs[i].createdAt, "YY");
          if (itemYear != yearTmp) {
            yearTmp = itemYear;
            result.push({ year: yearTmp, docs: [filterDocs[i]] });
          } else {
            result[result.length - 1].docs.push(filterDocs[i]);
          }
          console.info(filterDocs[i].path);
          console.info(this.postPath + "/" + filterDocs[i].title);
        }
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-list {
  width: 80%;
}
.list-group {
  padding-bottom: 0.5rem;
}
.list-title {
  text-align: center;
  font-size: 2rem;
}
.list-search {
  padding: 0.2rem;
}
.list-year {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 1.8rem;
  font-weight: bold;
}
.list-item {
  line-height: 2rem;
  position: relative;
  transition: border 0.5s;
  border-bottom: 1px dashed darkgray;
  margin-top: 1em;
  padding-bottom: 0.5em;
  display: flex;
  align-items: baseline;
}
.list-item-title {
  font-size: 1.25em;
  line-height: 2rem;
}
.list-item-time {
  position: absolute;
  right: 0rem;
  margin: 0 0.618em 0 2em;
  line-height: 2rem;
  flex: 1;
}
</style>