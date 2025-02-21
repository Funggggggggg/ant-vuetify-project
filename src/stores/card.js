// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { useUserStore } from './user' // ✅ 引入 useUserStore
// import axios from 'axios'

export const useCardStore = defineStore('card', () => {
    const user = ref('')
    const account = ref('')
    const title = ref('')
    const category = ref('')
    const content = ref()
    const image = ref()
    const isPrivate = ref(false)
    const like = ref(false)
    const createdAt = ref('')
    const updatedAt = ref('')
    // const cards = ref([]) // ✅ 用來存放取得的卡片資料

    // ✅ 從 `userStore` 取得 `createdPosts`，然後從 API 取回卡片詳細資料
    // const fetchUserCards = async () => {
    //   const userStore = useUserStore()
    //   if (!userStore.token) return // 沒登入就不請求
    //   try {
    //     const response = await axios.get('/api/cards', {
    //       headers: { Authorization: `Bearer ${userStore.token}` }
    //     })
    //     cards.value = response.data.result // 儲存卡片資料
    //     console.log('Fetched cards:', cards.value)
    //   } catch (error) {
    //     console.error('Failed to fetch cards:', error)
    //   }
    // }

    return {
      user, account, title, category, content, image, isPrivate, like, createdAt, updatedAt,
      // cards,
      // fetchUserCards // ✅ 暴露 fetchUserCards 來獲取資料
    }
})


