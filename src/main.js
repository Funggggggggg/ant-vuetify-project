/**
 * main.js
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import './styles/settings.scss'

// Vuetify
// import 'vuetify/styles'
// 直接從 plugins/vuetify.js 導入 vuetify 實例
import vuetify from '@/plugins/vuetify'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

// 修改插件註冊順序
app.use(vuetify)
registerPlugins(app)
app.mount('#app')
