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
              <v-btn icon="mdi-pencil" variant="text" color="#3B6C73"></v-btn>
            </v-card-title>
            <v-card-text>
              <p>{{ user.introduce }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- 卡片區 -->
        <v-col v-for="post of filteredPosts" :key="post._id" cols="12" md="6" lg="3">
          <post-cart v-bind="post"></post-cart>
        </v-col>
        <v-col cols="12">
          <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, watch, computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router'
import Avatar from "vue-boring-avatars";
import PostCart from '@/components/PostCart.vue'

const ITEMS_PER_PAGE = 2
const currentPage = ref(1)
const totalPage = computed(() => Math.ceil(posts.value.length / ITEMS_PER_PAGE))

const user = useUserStore()
const router = useRouter()

// 監聽登入狀態
watch(() => user.isLoggedIn, (newValue) => {
  if (!newValue) {
    router.push('/login')  // 若登出則導向登入頁
  }
})

onMounted(async () => {
  if (!user.isLoggedIn) {
    router.push('/login')
    return
  }

  await user.fetchUserData()
  console.log('Current user state:', {
    isLoggedIn: user.isLoggedIn,
    account: user.account,
    role: user.role
  })
})

const posts = ref([])
const search = ref('')
const filteredPosts = computed(() => {
  return posts.value
  .filter(post => post.title.toLowerCase().includes(search.value.toLowerCase()))
    // 一頁 2 筆
    // 第 1 頁 = 0 ~ 1
    // 第 2 頁 = 2 ~ 3
    // 第 3 頁 = 4 ~ 5
    // .slice(開始索引，結束索引)
    // 不包含結束索引
    .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
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
