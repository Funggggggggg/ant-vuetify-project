<template>
  <v-container style="background-color: antiquewhite;">
    <div class="ma-4">
      <v-row class=" d-flex justify-center">
        <v-col cols="6">
          <Avatar size="280" :variant="bauhaus" :name="user.account" style="margin-right:10px;"/>
        </v-col>
        <v-col cols="6">
          <div>{{ user.account }}</div>
          <div>{{ user.introduce }}</div>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item>

        </v-list-item>
      </v-list>
      <!-- <v-img
        :aspect-ratio="1"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        width="300"
        cover
      ></v-img> -->
    </div>
    <pre>{{ user }}</pre> <!-- 添加這行來顯示 user 狀態 -->
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import Avatar from "vue-boring-avatars";

const user = useUserStore()

onMounted(() => {
  user.fetchUserData();
  console.log('User store:', user); // 添加這行來查看 user 狀態
});
</script>
