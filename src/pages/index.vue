<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col v-for="post of filteredPosts" :key="post._id" cols="12" md="6" lg="3" >
        <post-cart v-bind="post"></post-cart>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import PostCart from '@/components/PostCart.vue'

const { api } = useAxios()

// FIXME 改成不分頁，一直往下延伸
// 分頁
const ITEMS_PER_PAGE = 4 //一頁兩個
const currentPage = ref(1) //目前在第一頁
// 例如：現在有5個，一頁2個 => 5/2 => 2.5 => 無條件進位到第3頁
const totalPage = computed(() => Math.ceil(posts.value.length / ITEMS_PER_PAGE)) //總共有幾頁

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

const getPosts = async () => {
  try {
    const { data } = await api.get('/post')
    posts.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
getPosts()
</script>

<route lang="yaml">
  meta:
    login: false
    admin: false
    title: '首頁'
  </route>
