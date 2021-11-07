import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'

createApp(App)
  .use(router) // 플로그인을 연결할때 use사용
  .mount('#app')
