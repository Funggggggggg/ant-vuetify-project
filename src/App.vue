<template>
  <v-app id="app">
    <!-- <component :is="layout"> -->
      <!-- 綁定 key 跳頁 -->
      <router-view :key="$route.fullPath" />
    <!-- </component> -->
  </v-app>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  mounted() {
    AOS.init()
  }
}
</script>

<style>
#app {
  background-color: #383431;
}
</style>
