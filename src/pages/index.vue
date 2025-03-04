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
      @click="openDialog(item)"
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

  <!-- 對話框 -->
  <!-- persistent => 點擊外框時不會關閉 -->
  <v-dialog v-model="dialog.open" persistent>
    <v-form>
      <v-card>
        <!-- 有 id 即編輯，否則新增 -->
        <v-card-title style="margin: 10px;">{{ dialog.id ? '編輯卡片' : '新增卡片'}}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="title.value.value"
            :label="'標題'"
            :error-messages="title.errorMessage.value"
          ></v-text-field>
          <v-select
            v-model="dialogcategory.value.value"
            :error-messages="dialogcategory.errorMessage.value"
            :items="categoryOptions"
            :label="'分類'"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-textarea
            v-model="content.value.value"
            :label="'卡片說明'"
            :error-messages="content.errorMessage.value"
          ></v-textarea>
          <VueFileAgent
            ref="fileAgent" v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            :help-text="'點擊或拖曳檔案至此'"
            :error-text="{ type:'檔案類型錯誤', size:'檔案大小超過限制' }"
          ></VueFileAgent>
          <v-checkbox
            v-model="isPrivate.value.value"
            :label="'私人'"
            :error-messages="isPrivate.errorMessage.value"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <!-- 取消送出按鈕 -->
          <v-btn @click="closeDialog">{{ '取消' }}</v-btn>
          <v-btn >{{ '送出' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAxios } from '@/composables/axios'
import PostCard from '@/components/PostCard.vue'
import { useUserStore } from '@/stores/user';
import { useField } from 'vee-validate'


const userStore = useUserStore()
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
  // console.log('過濾後的文章:', filtered)
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
      // console.log('獲取的文章:', data.result)
      posts.value.push(...data.result) // 將獲取到的資料添加到 posts 中
      // console.log('當前文章列表:', posts.value)
    } else {
      console.error('無效的回應格式', data)
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading = false // 確保在請求結束時設置 loading 為 false
  }
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
// ---------------------------------------------------
const dialog = ref({
  open: false,
  id: ''
})

const fileAgent = ref(null)

const title = useField('title')
const user = useField('user')
// const account = useField('account')
const content = useField('content')
const dialogcategory = useField('dialogcategory')
const isPrivate = useField('isPrivate')
// const like = useField('like')
const categoryOptions = computed(() => [
  { text: '紀念繪畫', value: '紀念繪畫' },
  { text: '回憶拼貼', value: '回憶拼貼' },
  { text: '故事攝影', value: '故事攝影' },
  { text: '物品改造', value: '物品改造' },
  { text: '其他', value: '其他' },
])

const openDialog = (item) => {
  // 修改時將資料填入表單
  if (item) {
    dialog.value.id = item._id
    user.value.value = userStore.account
    title.value.value = item.title
    content.value.value = item.content
    dialogcategory.value.value = item.dialogcategory
    isPrivate.value.value = item.isPrivate
  } else {
    // 新增時使用目前登入的用戶資料
    user.value.value = userStore.account
  }
  dialog.value.open = true

}

const closeDialog = () => {
  // 關閉對話框時重設
    dialog.value.id = ''
    dialog.value.open = false
    fileAgent.value.deleteFileRecord()
}

</script>

<style scoped>
.load-more-trigger {
  height: 1px;
}

.search-bar {
  max-width: 200px;  /* 縮小搜尋欄 */
  transition: width 0.3s ease-in-out;
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

