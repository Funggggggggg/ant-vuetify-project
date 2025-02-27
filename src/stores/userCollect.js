import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useUserStore } from './user'

export const useUserCollectStore = defineStore('userCollect', () => {
  const { apiAuth } = useAxios()
  const userStore = useUserStore()

  const collectedPosts = ref([]) // 收藏的文章清單

  // 獲取收藏的文章
  const fetchCollectedPosts = async () => {
    if (!userStore.isLoggedIn) return // 沒登入就不請求
    try {
      const { data } = await apiAuth.get('/userCollect/collected')
      collectedPosts.value = data.result || []
      // ✅
      // console.log('獲取收藏文章:', collectedPosts.value)
    } catch (error) {
      console.error('獲取收藏文章失敗:', error)
    }
  }

  // 更新收藏狀態
  const toggleCollectPost = async (postId) => {
    if (!userStore.isLoggedIn) {
      throw new Error('用戶未登入')
    }
    try {
      const { data } = await apiAuth.patch('/userCollect/uncollected', { post: postId })
      collectedPosts.value = data.result || []
    } catch (error) {
      console.error('更新收藏狀態失敗:', error)
      throw error
    }
  }

  return {
    collectedPosts,
    fetchCollectedPosts,
    toggleCollectPost
  }
})
