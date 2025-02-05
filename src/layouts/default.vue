<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">放 logo 圖回 welcome</v-btn>
      <v-spacer />
        <template v-for="nav of navs" :key="nav.to">
          <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">
            {{ nav.text }}
            <!-- 訊息通知顯現 -->
            <v-badge v-if="user.isLoggedIn && user.notifications > 0" :content="user.notifications" floating color="red"></v-badge>
          </v-btn>
        </template>
      <!-- 跑完迴圈後再跑登出 (tr作法) -->
        <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">{{ '登出' }}</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios' // 登出
import { useSnackbar } from 'vuetify-use-dialog' // register.vue
import { useRouter } from 'vue-router'

const user = useUserStore()
const { apiAuth } = useAxios() // 登出
const createSnackbar = useSnackbar() // register.vue
const router = useRouter()


// 導覽列項目
const navs = computed(() => {
  return [
    { icon: 'mdi-chat-processing', show: user.isLoggedIn }, //訊息通知 => 使用者登入時
    { to: '/register', text: '註冊', icon: 'mdi-account-plus' , show: !user.isLoggedIn },
    { to: '/login', text: '登入', icon: 'mdi-account-arrow-left' , show: !user.isLoggedIn  },
    { to: '/userPage', text: '個人頁面', icon: 'mdi-account', show: user.isLoggedIn },
    { to: '/about', text: '關於', show: true },
    { to: '/admin', text: '後台管理', icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
  ]
})

// 登出
const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green'
    }
  })
  router.push('/')
}
</script>
