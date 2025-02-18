<template>
  <v-app-bar style="height: 75px;" class="d-flex align-center justify-center">
    <v-container class="d-flex align-center">
      <router-link to="/" :active="false" class="d-flex align-center" style="text-decoration: none;">
        <img src="/antlogo.ico" alt="Logo" style="height: 40px;">
        <v-title> Memorial Nest </v-title>
      </router-link>
      <v-menu v-if="user.isLoggedIn || !user.isLoggedIn" offset-y>
        <v-list v-if="nav.show">
          <v-list-item v-for="nav in navs" :key="nav.to" @click="navigate(nav.to)">
            <v-list-item-title>{{ nav.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn v-if="user.isLoggedIn" icon="mdi-chat-processing" style="color: #F1D87F"></v-btn>
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon" rounded>
          <v-list-item-title>{{ nav.text }}</v-list-item-title>
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
    // { to: '/about', icon: 'mdi-information', show: true},
    // { to: '/register', icon: 'mdi-account-plus', show: !user.isLoggedIn },
    // { to: '/login', icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    // { to: '/userPage', icon: 'mdi-account-box', show: user.isLoggedIn },
    // { to: '/admin', icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
    { to: '/about', text: '關於', icon: 'mdi-information', show: true},
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLoggedIn },
    { to: '/login', text: '登入', icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    { to: '/userPage', text: '個人頁面', icon: 'mdi-account', show: user.isLoggedIn },
    { to: '/admin', text: '後台管理', icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
  ]
})

const navigate = (to) => {
  router.push(to)
}

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

<style>
  v-btn {
    margin-left: 10px;
  }

  v-title {
    color: #F1D87F;
    font-size: 24px;
    /* font-weight: bold; */
    margin-left: 15px;
  }
</style>
