<template>
  <div id="app">
    <transition name="fade" mode="out-in" appear>
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {

  }
}
</script>

<style>
#app {
  margin-top:0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-image: linear-gradient(180deg, rgba(0, 102, 255, 0.308) 0%, transparent 75%, transparent 100%);
  background-repeat: no-repeat;
  background-size: cover;
  align-content: center;
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
</style>
