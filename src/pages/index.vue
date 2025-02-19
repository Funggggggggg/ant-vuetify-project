<template>
  <v-container>
    <v-row class="d-flex justify-center" style="height: 100px;">
      <!-- FIXME 滑鼠靠近會拉開來-->
        <!-- class="custom-height" -->
        <!-- density="compact" -->
          <!-- style="max-width: 500px; width: 100%; height: 35px;" -->
      <!-- <v-col cols="12" md="6" class="d-flex align-center justify-center" style="height: 80px;"> -->
          <!-- <v-text-field
          v-model="search"
          prepend-inner-icon=""
          class="custom-height"
          density="compact"
          style="max-width: 500px; width: 100%; height: 35px;"
          ></v-text-field> -->
      <!-- </v-col> -->
      <!-- 分類 -->
      <v-col cols="10" class="d-flex align-center justify-center" style="height: 100px; background-color: #F1D87F;">
        <v-btn v-for="cat in categories" :key="cat" class="mx-2 text-body-2" :class="{ 'v-btn--active': category === cat }" style="max-width: 500px; line-height: 5px;" @click="category = cat" >
          {{ cat }}
        </v-btn>
        <v-fab
          v-model="search"
          class="d-flex align-center justify-center"
          icon="mdi-magnify"
          variant="flat"
          style="height: 100px;background-color: aqua;"
        ></v-fab>
      </v-col>
      <!-- <v-col cols="2">
      </v-col> -->
      <!-- 卡片區 -->
      <v-col v-for="post of filteredPosts" :key="post._id" cols="12" md="6" lg="3" >
        <post-cart v-bind="post"></post-cart>
      </v-col>
    </v-row>
    <div ref="loadMoreTrigger" class="load-more-trigger"></div>

    <!-- :active="!hidden" -->
          <v-fab
            class="ms-4"
            icon="mdi-plus"
            location="bottom end"
            size="small"
            absolute
            offset
            color="#C04759"
            ></v-fab>
            <!-- variant="outlined" -->

            <v-fab
            icon="mdi-arrow-up"
            location="bottom right"
            size="small"
            variant="outlined"
            ></v-fab>
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

const handleScroll = () => {
  // 只有當 category 的值為 '全部' 時才會觸發 getPosts 函數來加載更多資料。
  if (category.value !== '全部') return
  const trigger = loadMoreTrigger.value
  if (trigger && trigger.getBoundingClientRect().top <= window.innerHeight) {
    getPosts()
  }
}

const loadMoreTrigger = ref(null)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  getPosts() // 初始加載
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
.load-more-trigger {
  height: 1px;
}

</style>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '首頁'
</route>

