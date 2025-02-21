// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // pinia 的 setup 寫法，另一種是  option寫法 (番茄鐘使用state, actions, getters)
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const introduce = ref('')
  // const profile = ref('')
  const role = ref(UserRole.USER)
  const collectedPosts = ref([]) // 收藏的文章清單 (postId 陣列)
  const createdPosts = ref([]) // 發佈過的文章清單 (postId 陣列)
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
  const login = (data) => {
    console.log('Storage before login:', localStorage.getItem('ant-user'))
    // 如果有 token 就換 token ，沒有就不換
    // 4. 將取到的資料放到 pinia 裡面 (再到安全性 => 最下方保存 token)
    console.log('Login data received:', data) // 檢查收到的數據
    if (data.token) {
      token.value = data.token
    }
    console.log('Before setting account:', account.value) // 檢查設置前
    account.value = data.account
    console.log('After setting account:', account.value)  // 檢查設置後
    role.value = data.role
    introduce.value = data.introduce
    collectedPosts.value = data.collected || []  // 從後端同步收藏清單
    createdPosts.value = data.created || []  // 從後端同步發佈清單
    console.log('Final user state:', {
      token: token.value,
      account: account.value,
      role: role.value,
      introduce: introduce.value
    })
    console.log('Storage after login:', localStorage.getItem('ant-user'))
  }

  // 6. (出錯即登出)
  const logout = () => {
    token.value = ''
    account.value = ''
    introduce.value = ''
    role.value = UserRole.USER
    collectedPosts.value = [] // 清空收藏文章
    createdPosts.value = [] // 清空發佈文章
    // 清除 localStorage
    localStorage.removeItem('ant-user')
  }

  const fetchUserData = async () => {
    try {
      // 在函數內部引入 useAxios
      const { useAxios } = await import('@/composables/axios')
      const { apiAuth } = useAxios()

      const { data } = await apiAuth.get('/user/profile')
      console.log('API response:', data)  // 檢查 API 回應
      if (data.result) {
        login(data.result)
      } else {
        throw new Error('無效的回應格式')
      }
    } catch (error) {
      console.error('獲取用戶資料失敗:', error)
      logout()  // 確保錯誤時會登出
    }
  }

  // const fetchUserData = async () => {
  //   try {
  //     const response = await apiAuth.get('/api/user/profile', {
  //       headers: {
  //         Authorization: `Bearer ${token.value}`
  //       },
  //       cache: 'no-store' // 強制請求最新資料
  //     })
  //     console.log('User data fetched:', response.data) // 添加這行來查看響應數據
  //     account.value = response.data.account
  //     introduce.value = response.data.introduce
  //     role.value = response.data.role
  //     collectedPosts.value = response.data.collected || []
  //     createdPosts.value = response.data.created || []
  //   } catch (error) {
  //     console.error('Failed to fetch user data:', error)
  //         }
  // }

  return {
    token, account, role, introduce,
    collectedPosts, createdPosts,
    isLoggedIn, isAdmin, login, logout,
    fetchUserData
  }
}, {
  // Pinia 的 persist 插件可以自動幫助我們將 狀態 (state) 保存到 localStorage 或 sessionStorage
  persist: {
    key: 'ant-user',
    // 5. 因為安全性關係，只有保存 token jwt，其他資訊需另外跟後端要 => 進到前端路由 router/index
    pick: ['token']
  }
})
