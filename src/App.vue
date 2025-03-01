<template>
  <v-app id="app">
    <!-- <component :is="layout"> -->
      <!-- 綁定 key 跳頁 -->
      <router-view :key="$route.fullPath" />
    <!-- </component> -->
  </v-app>
</template>

<script setup>
// import { computed } from 'vue';
// import { useRoute } from "vue-router";
// import DefaultLayout from "@/layouts/default.vue";// 預設 Layout（含 Navbar）
// import EmptyLayout from "@/layouts/empty.vue";// 無 Navbar Layout

// const route = useRoute();
// const layout = computed(() => {
  // if (route.meta.layout === 'empty') {
    // return EmptyLayout;
  // } else {
    // return DefaultLayout;
  // }
// });
</script>

<style>
#app {
  background-color: #383431;
}
</style>
