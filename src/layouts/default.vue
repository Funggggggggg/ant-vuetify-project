<template>
  <v-app-bar elevation="0" scroll-behavior="hide" style="height: 75px; background-color: #383431" class="d-flex align-center justify-center">
    <v-container class="d-flex align-center">
      <router-link to="/welcome" :active="false" class="d-flex align-center" style="text-decoration: none;">
        <img src="/antlogo.ico" alt="Logo" style="height: 40px;">
        <v-toolbar-title class="custom-title ">Memorial Nest</v-toolbar-title>
      </router-link>
      <v-spacer /> <!--是個用來在佈局中創建空間的組件。它會自動佔據可用的空間，通常用於在佈局中分隔其他元素，使它們之間保持一定的距離。 -->
      <!-- 訊息通知 -->
      <v-btn v-if="user.isLoggedIn" icon="mdi-chat-processing" class="text-body-2" style="color: #EDE5D2;"></v-btn>
      <!-- 導航選單 -->
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon" class="text-body-2" variant="text" style="color: #EDE5D2;">
          {{ nav.text }}
          <!-- 訊息通知顯現 -->
          <v-badge v-if="user.isLoggedIn && user.notifications > 0" :content="user.notifications" floating color="red"></v-badge>
        </v-btn>
      </template>
      <!-- 登出按鈕 跑完迴圈後再跑登出 (tr作法) -->
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" rounded style="color: #EDE5D2;" @click="logout">{{ '登出' }}</v-btn>
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
    { to: '/', text: '首頁', show: true},
    { to: '/about', text: '關於', show: true},
    { to: '/register', text: '註冊', show: !user.isLoggedIn },
    { to: '/login', text: '登入', show: !user.isLoggedIn },
    { to: '/userPage', text: '個人頁面', show: user.isLoggedIn },
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

<style lang="scss">
/* 提高選擇器優先級 */
.v-application {
    .custom-title {
    font-family: "Abril Fatface", serif;
    color: #F1D87F;
    font-size: 24px;
    margin-left: 15px;
  }

  .v-btn{
    margin-left: 10px;
  }

  /* 使用更具體的選擇器 */
  .v-list .text-body-1,
  .v-menu .text-body-2 {
    letter-spacing: 0.13em !important;
    font-family: 'Roboto' !important;
  }

  .v-list-item-title {
    letter-spacing: 0.2em !important;
    font-family: 'Roboto' !important;
  }

}

</style>
