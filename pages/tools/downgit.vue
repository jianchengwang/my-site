<template>
  <div class="main">
    <h1 class="main-title">DownGit</h1>
    <div class="main-body">
      <input placeholder="GitHub 文件 或者文件夹 链接" v-model="gitrep" />
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
        this.$toast.show("Loading...");
        let response = await fetch(`/api/downgit?gitrep=${this.gitrep}`);
        let downloadLink = await response.text();
        this.$toast.clear();
        if (downloadLink) {
          this.$toast.success("download successfully", { delay: 2000 });
          downloadLink = downloadLink.replace(/\n/g, "");
          downloadLink = downloadLink.replace(/\"/g, "");
          window.open(downloadLink);
        } else {
          this.$toast.error("download failed!!!", { delay: 2000 });
        }
      } else {
        this.$toast.error("please input gitrep!!!", { delay: 2000 });
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
