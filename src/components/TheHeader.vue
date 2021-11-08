<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for=" nav in naviagtions"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{active: isMatch(nav.path)}"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components:{
    Logo
  },
  data() {
    return {
      naviagtions: [
        {
          name: 'Search',
          href:  '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt2948372',
          path: /^\/movie/  // '/movie'로 시작하는 경로인 경우 
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  methods: {
    isMatch(path){
      if (!path) return false // path값이 없으면 false 리턴 (active 따로 추가 x)
      console.log(this.$route)
      return path.test(this.$route.fullPath) // 정규표현식 path 조건에 지금 현재 path가 통과하는지 확인 
    }
  }
}
</script>

<style lang="scss" scoped>
  header{
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    .logo{
      margin-right: 40px;
    }
}
</style>
