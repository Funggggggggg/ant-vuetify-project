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
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Plugins
import { registerPlugins } from '@/plugins'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          snow: '#EDE5D2',
        },
      },
    },
  },
})

const app = createApp(App)

// 修改插件註冊順序
registerPlugins(app)
app.use(vuetify)
app.mount('#app')
