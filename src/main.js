/**
 * main.js
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import './styles/settings.scss'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
