<template>
  <v-container style="margin-top: 50px;">
    <div class="ma-8">
      <v-row class=" d-flex justify-center align-center text-snow">
        <v-col cols="2">
          <Avatar size="200" variant="beam" :name="user.account" :title="true" :color="colors" style="margin-right:10px;"/>
        </v-col>
        <v-col cols="6" style="margin-left: 50px;">
          <v-card variant="text" class="d-flex flex-column text-h5 content">
            <v-card-title style=" margin-top: 10px;" class="usrAccount">
              <h2>{{ user.account }}</h2>
              <v-btn icon="mdi-pencil" variant="text" class="text-snow"></v-btn>
            </v-card-title>
            <v-card-text>
              <p>{{ user.introduce }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
        <!-- 卡片區 -->
      <v-row v-if="posts.length > 0" class="d-flex justify-center">
        <v-col cols="12" class="d-flex justify-center align-center">
          <v-btn
            text="已建立"
            class="text-body-2 me-4 font-weight-bold rounded-lg"
            :variant="displayType === 'created' ? 'flat' : 'outlined'"
            :color="displayType === 'created' ? '#F1D87F' : '#F1D87F'"
            @click="displayType = 'created'"
          ></v-btn>
          <v-btn
            text="已收藏"
            class="text-body-2 ms-4 font-weight-bold rounded-lg"
            :variant="displayType === 'favorite' ? 'flat' : 'outlined'"
            :color="displayType === 'favorite' ? '#C04759' : '#C04759'"
            @click="displayType = 'favorite'"
          ></v-btn>
        </v-col>
        <v-col v-for="post of filteredPosts" :key="post._id" cols="12" md="6" lg="3" class="mt-4">
          <post-cart
            v-bind="post"
            :account="user.account"
          ></post-cart>
        </v-col>
        <v-col cols="12">
          <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center">
          <p>尚無文章</p>
        </v-col>
      </v-row>
    </div>

    <!-- 載入中顯示 -->
    <v-overlay v-if="loading" class="d-flex align-center justify-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>

    <!-- 錯誤提示 -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="ma-4"
    >
      {{ error }}
    </v-alert>

  </v-container>
</template>

<script setup>
import { onMounted, watch, computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router'
import Avatar from "vue-boring-avatars";
import PostCart from '@/components/PostCart.vue'
import { useAxios } from '@/composables/axios'
const { api } = useAxios()

const ITEMS_PER_PAGE = 16 // 每頁顯示 16 筆資料
const currentPage = ref(1) // 預設當前頁碼為 1
const totalPage = computed(() => Math.ceil(posts.value.length / ITEMS_PER_PAGE))

const user = useUserStore() // 使用者資料
const router = useRouter() // 獲取路由實例

const loading = ref(false) // 預設為 false，表示沒有載入中
const error = ref(null) // 預設為 null，表示沒有錯誤
const posts = ref([]) // 文章列表
const search = ref('') // 搜尋關鍵字

// 添加 顯示類型 的狀態
const displayType = ref('created') // 'created' 為已建立, 'favorite' 為已收藏

// 資料過濾：
const filteredPosts = computed(() => {
  // 先過濾文章類型
  const typeFilteredPosts = posts.value.filter(post => {
    if (displayType.value === 'created') {
      return post.user === user._id  // 顯示使用者建立的文章
    } else {
      return post.favorite  // 顯示收藏的文章
    }
  })
  // 再過濾搜尋關鍵字
  return typeFilteredPosts
    .filter(post => post.title.toLowerCase().includes(search.value.toLowerCase()))
    .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
})

// 添加獲取文章的方法
const getPosts = async () => {
  loading.value = true
  error.value = null

  try {
    // 根據顯示類型獲取不同的文章列表
    const endpoint = displayType.value === 'created'
      ? '/post/user/' + user._id  // 獲取使用者建立的文章
      : '/post/favorite/' + user._id  // 獲取使用者收藏的文章

    const { data } = await api.get(endpoint)
    if (!data?.result) {
      throw new Error('無效的回應格式')
    }
    posts.value = data.result
    console.log('獲取的文章:', posts.value)
  } catch (error) {
    console.error('獲取文章失敗:', error)
    error.value = '無法取得文章資料'
    posts.value = []
  } finally {
    loading.value = false
  }
}

// 監聽登入狀態
watch(() => user.isLoggedIn, (newValue) => {
  if (!newValue) {
    router.push('/login')  // 若登出則導向登入頁
  }
})

// 監聽顯示類型的變化
watch(displayType, () => {
  currentPage.value = 1  // 切換類型時重置頁碼
  getPosts()  // 重新獲取文章
})

// 監聽當前頁碼
onMounted(async () => {
  if (!user.isLoggedIn) {
    router.push('/login') // 若未登入則導向登入頁
    return
  }

  try {
    await user.fetchUserData() // 獲取用戶資料
    await getPosts()  // 添加這行
  } catch (error) {
    console.error('初始化失敗:', error)
  }
})

</script>

<style scoped>
.content {
  width: 600px;
  min-height: 235px;
  padding: 0px 15px;
  /* border-radius: 15px; */
  /* border: 0.2px groove #EDE5D2; */
  /* background-color: #3B6C73; */
  /* box-shadow: inset 0 1px 10px #cdcdcd; */
  /* transition: transform 0.3s ease; */
}

.usrAccount {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: #3B6C73; */
}
</style>
