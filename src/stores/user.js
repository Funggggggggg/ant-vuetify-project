// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // pinia 的 setup 寫法，另一種是  option寫法 (番茄鐘使用state, actions, getters)
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore('user', () => {
  const collected = ref([])  // 確保初始化為空陣列
  const token = ref('')
  const account = ref('')
  const introduce = ref('')
  const role = ref(UserRole.USER)
  const _id = ref('') // 新增 _id 屬性
  // const profile = ref('')
  // const collectedPosts = ref([]) // 收藏的文章清單 (postId 陣列)
  // const createdPosts = ref([]) // 發佈過的文章清單 (postId 陣列)
  // const locked = ref(false) // 發佈過的文章清單 (postId 陣列)

  // 檢查是否登入
  // 6. (isLoggedIn 來源)
  const isLoggedIn = computed(() => {
    return token.value.length > 0
  })

  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  // 6. (再放進 login)
  const login = async (data) => {
    try {
      if (data.token) {
        token.value = data.token
      }
      // console.log('Before setting account:', account.value) // 檢查設置前
    account.value = data.account
    role.value = data.role
    introduce.value = data.introduce
    collected.value = data.collected || []  // 從後端同步收藏清單
    _id.value = data._id  // 🟢 確保在這裡設置用戶 ID
    // console.log('After setting account:', account.value)  // 檢查設置後
    // collectedPosts.value = data.collected || []  // 從後端同步收藏清單
    // createdPosts.value = data.created || []  // 從後端同步發佈清單
    console.log('Final user state:', {
      token: token.value,
      account: account.value,
      role: role.value,
      introduce: introduce.value,
      _id: _id.value  // 🟢 確認打印 ID 是否正常
    })
    console.log('Storage after login:', localStorage.getItem('ant-user'))
    } catch (error) {
      console.error('Login failed:', error)
        // 清空用戶狀態
        token.value = ''
        account.value = ''
        introduce.value = ''
        role.value = UserRole.USER
        collected.value = [] // 清空收藏文章
        _id.value = ''
        localStorage.removeItem('ant-user')
      }
    }

  // 6. (出錯即登出)
  const logout = () => {
    token.value = ''
    account.value = ''
    introduce.value = ''
    role.value = UserRole.USER
    collected.value = [] // 清空收藏文章
    localStorage.removeItem('ant-user')
    // collectedPosts.value = [] // 清空收藏文章
    // createdPosts.value = [] // 清空發佈文章
    // 清除 localStorage
  }

  const fetchUserData = async () => {
    try {
      // 在函數內部引入 useAxios
      const { useAxios } = await import('@/composables/axios')
      const { apiAuth } = useAxios()

      const { data } = await apiAuth.get('/user/profile')
      console.log('API response:', data)  // 檢查 API 回應

      if (data.result) {
        // 🟢 直接設定用戶資料，避免無限循環
        account.value = data.result.account
        role.value = data.result.role
        introduce.value = data.result.introduce
        collected.value = data.result.collected || []
        _id.value = data.result._id
        // collectedPosts.value = data.result.collected || []
        // createdPosts.value = data.result.created || []
      } else {
        throw new Error('fetchUserData 無效的回應格式')
      }
    } catch (error) {
      console.error('fetchUserData 獲取用戶資料失敗:', error)
      logout()  // 確保錯誤時會登出
    }
  }

  return {
    token, account, role, introduce,
    collected, _id,
    isLoggedIn, isAdmin, login, logout,
    fetchUserData
    // collectedPosts, createdPosts,
  }
}, {
  // Pinia 的 persist 插件可以自動幫助我們將 狀態 (state) 保存到 localStorage 或 sessionStorage
  persist: {
    key: 'ant-user',
    // 5. 因為安全性關係，只有保存 token jwt，其他資訊需另外跟後端要 => 進到前端路由 router/index
    pick: ['token']
  }
})
