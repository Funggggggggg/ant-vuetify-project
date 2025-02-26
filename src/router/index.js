/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'

// 手動覆蓋自動生成的路由配置
const customRoutes = [
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import('@/pages/post/[id].vue'),
    props: true, // 🟢 確保路由參數 id 作為 props 傳入
    meta: {
      title: '文章詳情',
      login: false, // 是否需要登入
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([...routes, ...customRoutes]), // 合併路由
  // routes: setupLayouts(routes),
})

// beforeEach 進入每頁之前執行 function
// 用 jwt tokens 將資料拿回 pinia
// START_LOCATION 初始導航 => 路由器的初始路由位置 (是固定寫法)
router.beforeEach(async (to, from, next) => {
  const { apiAuth } = useAxios()
  const user = useUserStore()

  // 若是初始導航且有 jwt 才去呼叫
  // 6. 進到這取資料 => isLoggedIn、login、logout 是取 stores/user 的 useUserStore 的 computed
  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await apiAuth.get('/user/profile')
      user.login(data.result)
    } catch (error) {
      console.log(error)
      user.logout() //有錯誤直接登出
    }
  }

  // 路由守衛
  // => 1. 當用戶已經登錄（user.isLoggedIn 為 true），並且當前路由是 /login 或 /register 路徑之一時。=> 已經登錄卻試圖訪問登錄或註冊頁面，會被踢到首頁（/）。
  // => 2. 當目標路由（to.path）的 meta 中包含 login 標籤，且用戶未登錄（user.isLoggedIn 為 false）。操作：如果這個條件成立，即用戶未登錄並且目標頁面需要登錄才能訪問，則會將用戶重定向到登錄頁面（/login）。
  // => 3. 當目標路由的 meta 中包含 admin 標籤，且用戶不是管理員（user.isAdmin 為 false）。操作：如果這個條件成立，即用戶試圖訪問需要管理員權限的頁面，但用戶不是管理員，則會將用戶重定向到首頁（/）。
  // => 4. 如果以上條件都不成立，則執行 next()，允許路由正常進行，讓用戶可以繼續訪問目標頁面。操作：這是路由守衛的默認情況，表示不需要做任何跳轉，讓用戶繼續操作。
  if (user.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    next('/')
    // next({ path: '/' })
  } else if (to.meta.login && !user.isLoggedIn) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = to.meta.title + ' | 紀念巢'
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
