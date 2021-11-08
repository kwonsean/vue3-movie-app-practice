import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home.vue'
import About from './About.vue'
import Movie from './Movie.vue'
import NotFound from './NotFound.vue'

export default createRouter({
  // Hash, History 모드 설정 (현재는 Hash 모드)
  history: createWebHashHistory(),
  // pages
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})
