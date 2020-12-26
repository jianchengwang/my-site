<template>
  <div class="main">
    <h1 class="main-title">DownGit</h1>
    <div class="main-body">
      <input placeholder="GitHub 文件 或者文件夹 链接" :value="gitrep" />
      <div class="button-group">
        <a href="javascript:void(0);" @click="download">Download</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "T-DownGit",
  components: {},
  data() {
    return {
      gitrep: "",
    };
  },
  methods: {
    download: async function () {
      if (this.gitrep && this.gitrep.startsWith("https://github.com/")) {
        let response = await fetch(`/api/downgit?gitrep=${this.gitrep}`);
        let downloadLink = await response.text();
        if (downloadLink) {
          window.open(downloadLink);
        }
      } else {
        alert("please input gitrep!!!");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  padding-left: 0.5rem;
  width: 40rem;
}
.button-group {
  margin-top: 1rem;
}
</style>
