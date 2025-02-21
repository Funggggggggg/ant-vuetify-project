<template>
  <v-app id="app">
    <!-- 綁定 key 跳頁 -->
        <router-view :key="$route.fullPath" />
  </v-app>
</template>

<style>
#app {
  background-color: #383431;
}
</style>
