<template>
  <div class="container flex-1">
    <h1 class="list-title">{{ listTitle }}</h1>
    <div v-if="docsYear.length">
      <div class="list-group" v-for="dy in docsYear" :key="dy.year">
        <h2 class="list-year">{{ dy.year }}</h2>
        <ul class="list-part">
          <li class="list-item" v-for="doc in dy.docs" :key="doc.title"><a :href="doc.path">
              <div class="list-item-title">
                <span>
                  {{ doc.title }}
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
  props: ["docs", "listTitle"],
  computed: {
    docsYear: function () {
      let result = [];
      if (this.docs.length) {
        let yearTmp = this.utils.formatDate(this.docs[0].createdAt, "YY");
        let item = this.docs[0];
        item.createdAt = this.utils.formatDate(item.createdAt);
        result.push({ year: yearTmp, docs: [this.docs[0]] });
        for (let i = 1; i < this.docs.length; i++) {
          item = this.docs[i];
          item.createdAt = this.utils.formatDate(item.createdAt);
          let itemYear = this.utils.formatDate(this.docs[i].createdAt, "YY");
          if (itemYear != yearTmp) {
            yearTmp = itemYear;
            result.push({ year: yearTmp, docs: [this.docs[i]] });
          } else {
            result[result.length - 1].docs.push(this.docs[i]);
          }
        }
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  li {
    list-style: none;
    padding: 0;
    a {
      text-decoration: none;
      :hover {
        color: gainsboro;
      }
    }
  }
}
.list-group {
  padding-bottom: 0.5rem;
}
.list-title {
  text-align: center;
  font-size: 2rem;
}
.list-year {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 1.8rem;
}
.list-item {
  line-height: 2.2rem;
  width: 45rem;
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
  color: gainsboro;
  flex: 1;
}
</style>