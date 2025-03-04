<template>
  <v-container style="margin-top: 50px;">
    <div class="ma-8">
      <v-row class=" d-flex justify-center align-center text-snow">
        <v-col cols="2">
          <Avatar :size="200" variant="beam" :name="user?.account || 'Guest'" :title="true" style="margin-right:10px;"/>
        </v-col>
        <v-col cols="6" style="margin-left: 50px;" class="text-snow">
          <v-card variant="text" class="d-flex flex-column text-h5 content text-klee-one">
            <v-card-title style=" margin-top: 10px;" class="usrAccount">
              <h2>{{ user?.account || '未知用戶' }}</h2>
              <v-btn v-if="isCurrentUser" icon="mdi-pencil" variant="text" class="text-snow"></v-btn>
            </v-card-title>
            <v-card-text>
              <p>{{ user?.introduce || '尚無介紹' }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- 切換文章類型 -->
        <v-col cols="12" class="d-flex justify-center align-center ">
          <v-btn
            text="已建立"
            class="text-body-2 me-4 font-weight-bold rounded-lg text-klee-one"
            :variant="displayType === 'created' ? 'flat' : 'outlined'"
            :color="displayType === 'created' ? '#F1D87F' : '#F1D87F'"
            @click="changeDisplayType('created')"
          ></v-btn>
          <v-btn
            text="已收藏"
            class="text-body-2 ms-4 font-weight-bold rounded-lg text-klee-one"
            :variant="displayType === 'favorite' ? 'flat' : 'outlined'"
            :color="displayType === 'favorite' ? '#C04759' : '#C04759'"
            @click="changeDisplayType('favorite')"
          ></v-btn>
        </v-col>
      </v-row>
        <!-- 卡片區 -->
      <v-row v-if="filteredPosts.length > 0" class="d-flex justify-center">
        <v-col v-for="post of filteredPosts" :key="post.id" cols="12" md="6" lg="3" class="mt-4">
          <post-card
            v-bind="post"
            :account="user?.account"
            ></post-card>
          </v-col>
        <v-col cols="12">
          <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
        </v-col>
      </v-row>

      <!-- 無文章顯示 -->
      <v-row v-else class="d-flex justify-center text-center text-snow text-body-2 mt-8 text-klee-one">
        <p> 尚無文章 </p>
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
import { watch, computed, ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useUserCollectStore } from '@/stores/userCollect';
import { useRoute } from 'vue-router'
// useRoute：用來取得當前路由的資訊，例如路由參數、查詢字串以及路由的其他屬性。
// useRouter 獲取 Vue Router 的實例，從而進行程式化導航（例如使用 router.push() 跳轉頁面）
import { useAxios } from '@/composables/axios'
import Avatar from "vue-boring-avatars";
import PostCard from '@/components/PostCard.vue'

const { api } = useAxios() // 使用 axios
const route = useRoute() // 獲取當前路由
const userStore  = useUserStore() // 使用者資料
const userCollectStore = useUserCollectStore() // 收藏資料

const loading = ref(false) // 預設為 false，表示沒有載入中
const error = ref(null) // 預設為 null，表示沒有錯誤
const posts = ref([]) // 文章列表
const currentPage = ref(1) // 預設當前頁碼為 1
const ITEMS_PER_PAGE = 16 // 每頁顯示 16 筆資料
const user = useUserStore() // 使用者資料

const totalPage = computed(() => Math.ceil(posts.value.length / ITEMS_PER_PAGE))
const isCurrentUser = computed(() => userStore.user?.id === route.params.id);

console.log('🛑 route.params:', route.params) // 查看 route 內容

// 添加 顯示類型 的狀態
const displayType = ref('created') // 'created' 為已建立, 'favorite' 為已收藏

// 根據顯示類型篩選文章------------------------------------------------------------------
const filteredPosts = computed(() => {
    return posts.value
    .filter(post => {
      if (displayType.value === 'created') {
        return post.user.toString() === route.params.id;
      } else {
        return userCollectStore.collectedPosts.includes(post._id);
      }
    })
    .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE);
})

// 獲取用戶資料
// const fetchUser = async () => {
//   loading.value = true;
//   error.value = null;
//   try {
//     const { data } = await api.get(`/user/${route.params.id}`);
//     userStore.value = data.result;
//   } catch (err) {
//     console.error('❌ 無法獲取用戶資料:', err);
//     error.value = '無法取得用戶資料';
//   } finally {
//     loading.value = false;
//   }
// };

// 添加獲取文章的方法-------------------------------------------------------
const getPosts = async () => {
  console.log('route.params.id:', route.params.id) // 檢查 route.params.id 是否存在
  if (!route.params.id) {
    console.error('❌ 無法獲取用戶 ID，請確認用戶是否已正確進入頁面')
    return
  }
  if (loading.value) return // 避免重複請求
  loading.value = true
  error.value = null

  try {
    const endpoint = displayType.value === 'created'
      ? '/post/userposts/' + route.params.id  // 獲取使用者建立的文章
      : '/userCollect/collected/' + route.params.id  // 獲取使用者收藏的文章

      console.log('🚀 API 請求路徑:', endpoint) // 確認請求路徑是否正確
    const { data } = await api.get(endpoint)
    if (!data?.result) {
      throw new Error('無效的回應格式')
    }
    posts.value = data.result;
    console.log('✅ 獲取的文章:', posts.value)
  } catch (error) {
    console.error('❌ 獲取文章失敗:', error)
    error.value = '無法取得文章資料'
    posts.value = []
  } finally {
    loading.value = false
  }
}
// -------------------------------------------------------------------------

// 切換顯示類型
const changeDisplayType = (type) => {
  if (displayType.value !== type) {
    displayType.value = type;
    currentPage.value = 1;
    getPosts();
  }
}

// 監聽顯示類型變更
watch(displayType, getPosts);
watch(() => route.params.id, () => {
  // fetchUser();
  getPosts();
});

// 初次掛載執行
onMounted(() => {
  // fetchUser();
  getPosts();
});

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

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '個人頁面'
</route>

