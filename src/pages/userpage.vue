<template>
  <v-container style="margin-top: 50px;">
    <div class="ma-8">
      <v-row class=" d-flex justify-center align-center">
        <v-col cols="3">
          <Avatar size="200" :variant="bauhaus" :name="user.account" style="margin-right:10px;"/>
        </v-col>
        <v-col cols="5" style="margin-left: 50px;">
          <v-card variant="outlined" class="d-flex flex-column text-h5 content">
            <v-card-title style=" margin-top: 10px;">
              <h2>{{ user.account }}</h2>
            </v-card-title>
            <v-card-text class="d-flex align-center flex-grow-1">
              <p>{{ user.introduce }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router'
import Avatar from "vue-boring-avatars";

const user = useUserStore()
const router = useRouter()

// 監聽登入狀態
watch(() => user.isLoggedIn, (newValue) => {
  if (!newValue) {
    router.push('/login')  // 若登出則導向登入頁
  }
})

onMounted(async () => {
  if (!user.isLoggedIn) {
    router.push('/login')
    return
  }

  await user.fetchUserData()
  console.log('Current user state:', {
    isLoggedIn: user.isLoggedIn,
    account: user.account,
    role: user.role
  })
})
</script>

<style scoped>
.content {
  width: 500px;
  min-height: 235px;
  border-radius: 15px;
  border: 0.2px groove #EDE5D2;
  padding: 0px 15px;
  /* background-color: #3B6C73; */
  /* box-shadow: inset 0 1px 10px #cdcdcd; */
  /* transition: transform 0.3s ease; */
}
</style>
