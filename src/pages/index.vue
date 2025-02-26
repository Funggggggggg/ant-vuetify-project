<template>
  <v-container>
    <v-row class="d-flex justify-center" style="width: 100%; gap: 5px; margin-top: 20px;">
      <v-col cols="12" class="d-flex align-center justify-center" style="height: 100px;">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="comfortable"
          single-line
          color="#EDE5D2"
          :style="{
            width: search.length > 0 ? '350px' : '100px',
            transition: 'width 0.3s ease-in-out',
            textAlign: 'left',
            marginLeft: search.length > 0 ? '20px' : '0px' // 讓它往右移動
          }"
          class="text-body-1 text-snow d-flex align-center me-4 search-bar"
        ></v-text-field>
        <v-btn
          v-for="cat in categories"
          :key="cat"
          class="mx-2 text-body-2 ms-0"
          :class="{ 'v-btn--active': category === cat }"
          style="max-width: 500px; line-height: 5px; color: #EDE5D2;"
          variant="tonal"
          @click="category = cat"
        >
          {{ cat }}
        </v-btn>
      </v-col>

      <!-- 卡片區 -->
      <v-col v-for="post of filteredPosts" :key="post._id" cols="12" md="6" lg="3">
        <post-card v-bind="post"></post-card>
      </v-col>
    </v-row>

    <!-- 載入更多觸發器 -->
    <div ref="loadMoreTrigger" class="load-more-trigger"></div>

    <!-- 功能按鈕區 -->
    <v-fab
      class="ms-4 custom-fab-plus"
      icon="mdi-plus"
      location="top end"
      size="x-large"
      color="#F1D87F"
      variant="outlined"
      ></v-fab>

    <v-fab
      icon="mdi-arrow-up"
      location="bottom left"
      variant="outlined"
      absolute
      class="custom-fab-up"
      style="margin: 16px;"
      color="#F1D87F"
      @click="scrollToTop"
      ></v-fab>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAxios } from '@/composables/axios'
import PostCard from '@/components/PostCard.vue'
const { api } = useAxios()

// ----------------------------分頁----------------------------------
// const ITEMS_PER_PAGE = 4 //一頁4個
// const currentPage = ref(1) //目前在第一頁
// 例如：現在有5個，一頁2個 => 5/2 => 2.5 => 無條件進位到第3頁
// const totalPage = computed(() => Math.ceil(posts.value.length / ITEMS_PER_PAGE)) //總共有幾頁

const posts = ref([]) //這個 post 是從 API 獲取的所有文章列表
const search = ref('')
const category = ref('全部') // 分類變數，預設為'全部'
const categories = ['全部','紀念繪畫', '回憶拼貼', '故事攝影', '物品改造', '其他'] // 分類選項
const ITEMS_PER_LOAD = 4 // 每次加載的項目數量
let loading = false // 加載狀態

const filteredPosts = computed(() => {
  const filtered = posts.value
    .filter(post => {
        const titleMatch = post.title.toLowerCase().includes(search.value.toLowerCase())
        const categoryMatch = category.value === '全部' || post.category === category.value
        return titleMatch && categoryMatch
      })
    // .filter(post => post.title.toLowerCase().includes(search.value.toLowerCase()))
    // .filter(post => category.value === '全部' || post.category === category.value) // 根據分類過濾
  console.log('過濾後的文章:', filtered)
  return filtered
})

const getPosts = async () => {
  if (loading) return
  loading = true
  try {
    const { data } = await api.get('/post', {
      params: {
        offset: posts.value.length, // 從 posts 的長度開始加載
        limit: ITEMS_PER_LOAD // 加載 ITEMS_PER_LOAD 筆資料
      }
    })
    if (data && data.result) {
      console.log('獲取的文章:', data.result) // 添加這行
      posts.value.push(...data.result) // 將獲取到的資料添加到 posts 中
      console.log('當前文章列表:', posts.value) // 添加這行
    } else {
      console.error('無效的回應格式', data)
    }
  } catch (error) {
    console.log(error)
  }
  loading = false // 結束加載狀態
}

// 監聽滾動事件
const handleScroll = () => {
  // 只有當 category 的值為 '全部' 時才會觸發 getPosts 函數來加載更多資料。
  if (category.value !== '全部') return
  const trigger = loadMoreTrigger.value
  if (trigger && trigger.getBoundingClientRect().top <= window.innerHeight) {
    console.log('觸發加載更多文章')
    getPosts()
  }
  // 控制回到頂部按鈕的顯示/隱藏
  showScrollTop.value = window.scrollY > 300
}

const loadMoreTrigger = ref(null)

// 這是一個生命週期鉤子，當組件被掛載時，我們需要監聽滾動事件。
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  getPosts() // 初始加載
})

// 這是一個生命週期鉤子，當組件被卸載時，我們需要移除事件監聽器。
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 控制回到頂部按鈕的顯示
const showScrollTop = ref(false)

// 回到頂部功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

</script>

<style scoped>
.load-more-trigger {
  height: 1px;
}

.search-bar {
  max-width: 150px;  /* 縮小搜尋欄 */
  min-width: 100px; /* 設定最小寬度 */
  transition: width 0.3s ease-in-out;
  /* flex-grow: 0;  防止搜尋欄擴張 */
}

.search-bar ::v-deep .v-input__control {
  width: 100% !important;
}

/* 或者為按鈕添加自定義類別 */
.custom-fab-up {
  position: fixed !important;
  top: -50px !important;
  left: 160px !important;
  z-index: 999 !important;
}

.custom-fab-plus {
  position: fixed !important;
  top: 190px !important;
  right: 250px !important;
  z-index: 999 !important;
  scale: 1.3 !important;
}

</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '首頁'
</route>

