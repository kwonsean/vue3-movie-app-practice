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
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { mapState } from 'vuex'
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
  computed:{
    ...mapState('about',[
      'image',
      'name'
    ]),
    // image(){
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // }
  },
  methods: {
    isMatch(path){
      if (!path) return false // path값이 없으면 false 리턴 (active 따로 추가 x)
      console.log(this.$route)
      return path.test(this.$route.fullPath) // 정규표현식 path 조건에 지금 현재 path가 통과하는지 확인 
    },
    toAbout(){
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
  header{
    position: relative;
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    .logo{
      margin-right: 40px;
    }
    .user{
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      transition: .4s;
      &:hover{
        background-color: darken($gray-200, 10%);
      }
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        left: 5px;
      }
    }
    @include media-breakpoint-down(sm){
      .nav {
        display: none;
      }
    }
}
</style>
