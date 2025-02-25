<template>
  <v-card class="card text-abril" @mouseenter="hightlight = true " @mouseleave="hightlight = false">
    <div class="d-flex align-center mb-4">
      <Avatar :size="30" variant="beam" :name="props.account" :title="true"/>
      <div class="ms-4">{{ props.account }}</div>
    </div>
        <v-img class="picMask" :class="{ 'hightlight': hightlight }" :src="image" height="200" cover ></v-img>
    <v-row class="info">
      <v-col col="9">
        <v-card-title>
          <router-link :to="'/post/' + _id" style=" text-decoration: none ; font-weight:500 !important;" class="text-body-1 text-snow">{{ title }}</router-link>
        </v-card-title>
      </v-col>
      <!-- 綁定按鈕 按了可以放進收藏清單-->
      <v-col cols="3" class="d-flex align-center">
        <v-icon
            :style="{ color: isFavorite ? '#C04759' : '#F1D87F', fontSize: '25px',transition: 'color 0.3s ease' }"
            left
            class="ms-1"
            @click.stop="toggleFavorite"
        >
          {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-col>
    </v-row>
    <v-card-subtitle class="subtitle">
      {{ category }}
    </v-card-subtitle>
    <!-- <v-card-text>{{ content }}</v-card-text> -->
    <v-card-text class="content">{{ truncatedContent }}</v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import Avatar from "vue-boring-avatars";
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useAxios()
const user = useUserStore()
const createSnackbar = useSnackbar()
const hightlight = ref(false)
const router = useRouter()

// const CardStore = useCardStore()
const props = defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    // user: {
    type: String,
    default: ''
  },
  account: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default:''
  },
  like: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
})
console.log('PostCard props:', props)

// const isFavorite = ref(false)
const isFavorite = computed(() => { // 計算屬性，判斷是否已收藏
  if (!user.isLoggedIn || !user.collected) return false // 未登入或收藏清單為空，返回 false
  return user.collected.some(item => // 判斷收藏清單是否有這篇文章，有則返回 true
    item.post && item.post.toString() === props._id.toString() // 文章 ID 相同，返回 true
  )
})
// 在組件掛載時檢查收藏狀態
onMounted(async () => {
  if (user.isLoggedIn && (!user.collected || user.collected.length === 0)) {
    await user.checkLogin()
  }
})

// 收藏文章
const toggleFavorite = async (event) => { // 點擊收藏按鈕
  event.preventDefault()  // 防止事件冒泡

  if (!user.isLoggedIn) { // 未登入，跳轉至登入頁面
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/user/collected', { // 發送收藏請求
      post: props._id
    })
    // 更新使用者的收藏清單
    if (data.success) {
      user.collected = data.result.collected // 確保更新收藏狀態

      // 根據實際的收藏狀態顯示訊息
      const isNowFavorite = user.collected.some(item =>
        item.post.toString() === props._id.toString()
      )

      createSnackbar({
        text: isNowFavorite ? '成功加入收藏':'已取消收藏',
        snackbarProps: {
          color: '#3B6C73'
        }
      })
    }
  } catch (error) {
    console.log('收藏操作失敗:', error)
    createSnackbar({
      text: 'api.' + (error?.response?.data?.message || '操作失敗'),
      snackbarProps: {
        color: '#C04759'
      }
    })
  }
}

// 計算屬性限制 content 顯示字數，最多顯示 100 字
const truncatedContent = computed(() => {
  const maxLength = 40
  return props.content.length > maxLength ? props.content.slice(0, maxLength) + '...' : props.content
})

</script>

<style scoped>

.info {
  position: relative;
  z-index: 2;
  padding: 10px 10px 10px 0px;
}

.subtitle {
  position: relative;
  z-index: 2;
  margin-top: 12px;
  color: #78b6bf;
  /* color: #bd717c; */
  font-weight: 400;
}

.card {
  /* border-radius: 30px 0px 0px 0px; */
  border-radius: 30px 30px 30px 30px;
  padding: 17px;
  color: #ede5d2;
  width: 100%;
  height: 100%;
  /* background-color: #312E2B; */
  background-color: #403D3A;
  /* border: 0.5px solid #3B6C73; */
  /* border: 0.5px solid #F1D87F77; */
  border: 0.5px solid #EDE5D288;
  /* border: 2px dotted #EDE5D288; */
}
/* <!-- color="#3B6C73" -->
      <!-- color="#C04759" -->
      <!-- color="#3B6C73" -->
      <!-- color="#7D5A2C" --> */

.card::before {
  content: '';
  position: absolute;
  width:500px;
  border-radius: 10px;
  height: 0.5px;
  top: 325px;
  /* top: 270px; */
  left: 30px;
  z-index: 3 !important;
  /* background-color: #ede5d23d !important; */
}

.card:hover::before {
  content: '';
  /* background-color: #ede5d2a6 !important; */
  /* background-color: #C04759 !important; */
  /* background-color: #366269 !important; */
  /* background-color: #F1D87F !important; */
  /* background-color: #f1d87faf !important; */
  background-color: #EDE5D288 !important;
  transition: 0.7s;
}

.picMask {
  mask: radial-gradient(circle, rgb(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  -webkit-mask: radial-gradient(circle, rgba(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  height: 100%;
  width: 100%;
  border-radius: 15px 15px 15px 15px;
  transition: all 0.3s ease;
}

.content {
  color: #EDE5D2;
  line-height: 1.7;
}

.hightlight {
  mask: radial-gradient(circle, rgb(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  -webkit-mask: radial-gradient(circle, rgba(255, 169, 56, 1), rgba(255, 169, 56, 0.5)) !important;
  filter: brightness(1.2);
}

</style>

