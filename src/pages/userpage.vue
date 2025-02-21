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
          <v-btn text="已建立" class="text-body-2 me-4 font-weight-bold rounded-lg" variant="outlined" color="#F1D87F"></v-btn>
          <!-- <v-btn text="已建立" class="text-body-2 me-4 font-weight-bold rounded-lg" variant="outlined" color="#3B6C73"></v-btn> -->
          <!-- <v-btn text="已建立" class="text-body-2 me-4 font-weight-bold rounded-lg" variant="outlined" color="#78b6bf"></v-btn> -->
          <v-btn text="已收藏" class="text-body-2 ms-4 font-weight-bold rounded-lg" variant="outlined" color="#C04759"></v-btn>
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
const currentPage = ref(1)
const totalPage = computed(() => Math.ceil(posts.value.length / ITEMS_PER_PAGE))

const user = useUserStore()
const router = useRouter()

const loading = ref(false) // 預設為 false，表示沒有載入中
const error = ref(null) // 預設為 null，表示沒有錯誤
const posts = ref([])
const search = ref('')
// 資料過濾：
const filteredPosts = computed(() => {
  return posts.value
  .filter(post => post.title.toLowerCase().includes(search.value.toLowerCase()))
    // .slice(開始索引，結束索引)
    // 不包含結束索引
    .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
})

// 添加獲取文章的方法
const getPosts = async () => {
  loading.value = true // 開始載入狀態
  error.value = null // 清空錯誤訊息

  try {
    const { data } = await api.get('/post', {
      params: {
        offset: posts.value.length, // 從 posts 的長度開始加載
        limit: ITEMS_PER_PAGE // 加載 ITEMS_PER_PAGE 筆資料
      }
    })
    if (!data?.result) { // 若沒有 result 屬性，則拋出錯誤
      throw new Error('無效的回應格式')
    }
    posts.value = data.result // 將獲取到的資料添加到 posts 中
    console.log('獲取的文章:', posts.value)
  } catch (error) {
    console.error('獲取文章失敗:', error)
    error.value = '無法取得文章資料'
    posts.value = [] // 若獲取失敗，則清空 posts
  } finally {
    loading.value = false // 不論成功失敗，都結束載入狀態
  }
}

// 監聽登入狀態
watch(() => user.isLoggedIn, (newValue) => {
  if (!newValue) {
    router.push('/login')  // 若登出則導向登入頁
  }
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
