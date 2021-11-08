import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store' // 특정 폴더에 index.js는 생략이 가능하다. 이렇게 작성해도 index.js를 연결해줌 

createApp(App)
  .use(router) // 플로그인을 연결할때 use사용
  .use(store)  // vuex 연결 
  .mount('#app')
