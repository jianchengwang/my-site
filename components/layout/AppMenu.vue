<template>
  <div class="max-w-3xl my-12 ml-auto mr-auto">
    <nav class="flex mb-5 justify-center mx-auto" role="navigation">
      <nuxt-link :class="navClass('/')" to="/">
        HOME
      </nuxt-link>
      <nuxt-link :class="navClass('/tech')" to="/tech">
        TECH
      </nuxt-link>
      <nuxt-link :class="navClass('/life')" to="/life">
        LIFE
      </nuxt-link>
      <nuxt-link :class="navClass('/store')" to="/store">
        STORE
      </nuxt-link>
      <nuxt-link :class="navClass('/book')" to="/book">
        BOOK
      </nuxt-link>
      <nuxt-link :class="navClass('/project')" to="/project">
        PROJECT
      </nuxt-link>
      <nuxt-link :class="navClass('/about')" to="/about">
        ABOUT
      </nuxt-link>
      <nuxt-link :class="navClass('/girls')" to="/girls">
        Grils
      </nuxt-link>
      <nuxt-link :class="navClass('/albums')" to="/albums">
        Albums
      </nuxt-link>
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
  methods: {
    navClass(name) {
      const isTech = this.currentPath.startsWith("/tech/");
      const isLife = this.currentPath.startsWith("/life/");
      const isStore = this.currentPath.startsWith("/store/");
      const isAbout = this.currentPath.startsWith("/about");
      const isGirls = this.currentPath.startsWith("/girls");
      const isAlbums = this.currentPath.startsWith("/albums");

      return `uppercase no-underline mx-3 ${
        this.currentPath === name ||
        (isTech && name === "/tech") ||
        (isLife && name === "/life") ||
        (isStore && name === "/store") ||
        (isAbout && name === "/about") ||
        (isGirls && name === "/girls") ||
        (isAlbums && name === "/albums")
          ? "text-black font-semibold"
          : "text-gray-700"
      }`;
    },
  },
};
</script>