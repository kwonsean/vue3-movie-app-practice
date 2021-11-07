<template>
  <TheHeader />
  <RouterView />
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
export default {
  components:{
    TheHeader
  }
}
</script>

<style lang="scss">
// 모든 컴포넌트에서 부트스르랩을 사용하기 위해 scoped는 작성하지 않는다.
@import "~/scss/main.scss"
</style>
