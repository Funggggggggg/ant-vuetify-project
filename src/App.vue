<template>
  <v-app>
    <!-- 綁定 key 跳頁 -->
        <router-view :key="$route.fullPath" />
  </v-app>
</template>
