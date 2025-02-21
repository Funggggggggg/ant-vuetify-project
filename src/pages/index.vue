<template>
  <v-container>
    <v-row class="d-flex justify-center" style="width: 100%; gap: 5px; margin-top: 20px;">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        color="#EDE5D2"
        variant="default"
        class="text-body-2 d-flex align-center justify-center search-bar"
      ></v-text-field>
      <v-col cols="8" class="d-flex align-center justify-center" style="height: 100px;">
        <v-btn
          v-for="cat in categories"
          :key="cat"
          class="mx-2 text-body-2 search-container"
          :class="{ 'v-btn--active': category === cat }"
          style="max-width: 500px; line-height: 5px; color: #EDE5D2;"
          variant="default"
          @click="category = cat"
        >
          {{ cat }}
        </v-btn>
      </v-col>

      <!-- 卡片區 -->
      <v-col v-for="post of filteredPosts" :key="post._id" cols="12" md="6" lg="3">
        <post-cart v-bind="post"></post-cart>
      </v-col>
    </v-row>

    <!-- 載入更多觸發器 -->
    <div ref="loadMoreTrigger" class="load-more-trigger"></div>

    <!-- 功能按鈕區 -->
    <v-fab
      class="ms-4 custom-fab-plus"
      :scroll-behavior="hide"
      icon="mdi-plus"
      location="top end"
      size="x-large"
      color="#F1D87F"
      variant="outlined"
      ></v-fab>

      <!-- size="large" -->
    <v-fab
      icon="mdi-arrow-up"
      location="bottom right"
      variant="outlined"
      absolute
      class="custom-fab-up"
      style="margin: 16px;"
      color="#3B6C73"
      @click="scrollToTop"
      ></v-fab>
      <!-- color="#3B6C73" -->
      <!-- color="#C04759" -->
      <!-- color="#3B6C73" -->
      <!-- color="#7D5A2C" -->
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAxios } from '@/composables/axios'
import PostCart from '@/components/PostCart.vue'

const { api } = useAxios()

// ----------------------------分頁----------------------------------
// const ITEMS_PER_PAGE = 4 //一頁4個
// const currentPage = ref(1) //目前在第一頁
// 例如：現在有5個，一頁2個 => 5/2 => 2.5 => 無條件進位到第3頁
// const totalPage = computed(() => Math.ceil(posts.value.length / ITEMS_PER_PAGE)) //總共有幾頁

const posts = ref([])
const search = ref('')
const category = ref('全部') // 分類變數，預設為'全部'
const categories = ['全部','紀念繪畫', '回憶拼貼', '故事攝影', '物品改造', '其他'] // 分類選項
const ITEMS_PER_LOAD = 4 // 每次加載的項目數量
let loading = false // 加載狀態

const filteredPosts = computed(() => {
  return posts.value
  .filter(post => post.title.toLowerCase().includes(search.value.toLowerCase()))
    // 一頁 2 筆
    // 第 1 頁 = 0 ~ 1
    // 第 2 頁 = 2 ~ 3
    // 第 3 頁 = 4 ~ 5
    // .slice(開始索引，結束索引)
    // 不包含結束索引
    // .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
    .filter(post => category.value === '全部' || post.category === category.value) // 根據分類過濾
})

const getPosts = async () => {
  if (loading) return
  loading = true
  try {
    const { data } = await api.get('/post', {
      params: {
        offset: posts.value.length,
        limit: ITEMS_PER_LOAD
      }
    })
    posts.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
  loading = false
}

// 監聽滾動事件
const handleScroll = () => {
  // 只有當 category 的值為 '全部' 時才會觸發 getPosts 函數來加載更多資料。
  if (category.value !== '全部') return
  const trigger = loadMoreTrigger.value
  if (trigger && trigger.getBoundingClientRect().top <= window.innerHeight) {
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
  max-width: 250px;  /* 縮小搜尋欄 */
  /* width: 100%; */
  flex-grow: 0;  /* 防止搜尋欄擴張 */
  /* background-color: aqua; */
  /* font-size: 20px; */
  /* line-height: 0px; */
  color: #EDE5D2;
}

/* 或者為按鈕添加自定義類別 */
.custom-fab-up {
  position: fixed !important;
  bottom: 10px !important;
  left: 200px !important;
  z-index: 999 !important;
}

.custom-fab-plus {
  position: fixed !important;
  top: 190px !important;
  right: 250px !important;
  z-index: 999 !important;
  scale: 1.3 !important;
}

.search-container {
  margin-left: 0px !important;
}

</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '首頁'
</route>

