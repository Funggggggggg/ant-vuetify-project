<template>
  <v-container v-if="post && post._id">
    <v-row class=" d-flex justify-center align-center">
      <v-col cols="12">
        <h1 class="text-center text-snow text-h3 mt-4 mb-4 text-klee-one">{{ post.title || '載入中...'  }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="5" md="6" class="mt-8">
        <div  class="border pa-3 rounded-xl">
          <v-img v-if="post.image" :src="post.image" class=" rounded-xl"></v-img>
        </div>
      </v-col>
      <v-col cols="7" md="6" class="text-snow text-body-2 mt-4">
        <div class="d-flex align-center mb-4 text-abril">
          <Avatar :size="30" variant="beam" :name="post.account" :title="true"/>
          <div class="ms-4" style="font-size: x-large;">{{ post.account || '訪客' }}</div>
        </div>
        <p class="mb-4 text-body-1 text-klee-one ">{{ '分類：'+ (post.category || '無分類') }}</p>
        <!-- <p>{{ post.like }}</p> -->
        <p v-if="post.content" class="mb-4 text-body-2 text-klee-one">{{ post.content|| '內容加載中...'}}</p>
        <!-- 購物車數量 -->
        <v-form :disabled="isSubmitting" class="w-100 d-flex align-center justify-end">
          <v-btn type="submit" :loading="isSubmitting" variant="text">
            <v-icon
                v-if="post && post._id"
                :style="{ color: isFavorite ? '#C04759' : '#F1D87F', fontSize: '25px' }"
                left
                class="ms-1"
                >
              {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <!-- Snackbar.vue -->
    <v-snackbar
      v-model="showSnackbar"
      :timeout="snackbarProps.timeout || 2000"
      :color="snackbarProps.color || '#C04759'"
      :show-close="snackbarProps.showCloseButton || false"
    >
      {{ snackbarText  }}
    </v-snackbar>
  <!--商品下架有提示 => overlays  -->
  <v-overlay :model-value="post.isPrivate" class="align-center justify-center" scrim="black" opacity="0.8" persistent>
    <h1 class="text-center">'私人卡片'</h1>
  </v-overlay>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router' // 沒有 R取路由資訊 有 R做挑轉資訊
import { useCardStore } from '@/stores/card'
// import { useForm } from 'vee-validate'
// import { useUserStore } from '@/stores/user'
// import { useSnackbar } from 'vuetify-use-dialog'
import Avatar from "vue-boring-avatars";

const { api } = useAxios()
// const { api, apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const card = useCardStore()
// const user = useUserStore()
// const createSnackbar = useSnackbar()

const isSubmitting = ref(false)
// const post = ref(null) // 初始為 null，表示資料尚未加載
const post = ref({
  _id: '',
  account: '',
  title: '',
  content: '',
  image: '',
  category: '' ,// 分類
  isPrivate: false,
  like: false,
})

// const props = defineProps({
//   text: {
//     type: String,
//     default: ''
//   },
//   snackbarProps: {
//     type: Object,
//     default: () => ({})
//   }
// })

// 取得文章
const getPost = async () => {
  try {
    const { data } = await api.get('/post/' + route.params.id)
    if (data && data.result) {
      post.value = data.result
      document.title = post.value.title + ' | 紀念巢'
    } else {
      console.error('API 回傳的資料不完整，將跳轉至首頁')
      post.value = {} // 避免渲染時讀取 undefined
      router.push('/')
    }

    // 檢查是否已收藏
    if (card.isLoggedIn) {
      isFavorite.value = card.collected.some(
        item => item.post.toString() === post.value._id)
    }
  } catch (error) {
    console.log(error)
    post.value = {} // 避免渲染時遇到 undefined
    router.push('/') //有問題丟回首頁
  }
}

onMounted(async () => {
  try {
    if (route.params.id) {
      console.log('獲取到的文章 ID:', route.params.id)
      await getPost()
    } else {
      console.error('路由參數 ID 不存在，將跳轉至首頁')
      router.push('/') // 路由 ID 無效時返回首頁
    }
  } catch (error) {
    console.error('初始化失敗:', error)
    post.value = {} // 避免渲染時遇到 undefined
  }
})
// 追蹤收藏狀態
const isFavorite = ref(false)

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarProps = ref({
  color: '#C04759',
  timeout: 2000,
  showCloseButton: true
})

// 如果沒有登入，跳轉至登入頁面
// const submit = async () => {
//   if (!user.isLoggedIn) {
//     router.push('/login')
//     return
//   }
//   isSubmitting.value = true
//   try {
//     const { data } = await apiAuth.patch('/user/collected', {
//       post: post.value._id,
//     })
//     console.log(post.value._id)
//     user.collected = data.result.collected
//     isFavorite.value = !isFavorite.value // 切換收藏狀態

//     snackbarText.value = isFavorite.value ? '成功加入收藏' : '已取消收藏'
//     snackbarProps.value = {
//       color: '#3B6C73',
//       timeout: 2000,
//       showCloseButton: true
//     }
//   } catch (error) {
//     console.log(error)
//     snackbarText.value = 'api.' + (error?.response?.data?.message || '未知錯誤')
//     snackbarProps.value = {
//       color: '#C04759',
//       timeout: 2000,
//       showCloseButton: true
//     }
//     showSnackbar.value = true
//   }
//   isSubmitting.value = false
// }
</script>

<style scoped>

.pic {
  border: 0.5px solid #EDE5D288;
}

.pic img {
  border: 5px solid #fff;
}

</style>

<!-- 修改路由 -->
<route lang="yaml">
  meta:
  title: '發布文章'
</route>

