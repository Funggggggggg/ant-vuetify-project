<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item :title="user.account">
        <template #prepend>
          <Avatar :variant="pixel" :name="user.account" style="margin-right:10px;"/>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="nav in navs" :key="nav.to" :prepend-icon="nav.icon" :title="nav.text" :to="nav.to"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Avatar from "vue-boring-avatars";

const user = useUserStore()
console.log(user.avatar)
const navs = computed(() => {
  return [
    { to: '/admin/post', text: '卡片管理', icon: 'mdi-card-bulleted-outline' },
    { to: '/admin/users', text: '會員管理', icon: 'mdi-format-list-bulleted' },
    { to: '/', text: '首頁', icon: 'mdi-home' },
  ]
})
</script>
