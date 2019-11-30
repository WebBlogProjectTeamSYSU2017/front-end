<template>
    <div class="container">
        <div v-html="api"></div>
    </div>
</template>

<script>
import api from '../assets/api.md'
export default {
  name: 'root',
  data: function () {
    return {
      api: this.md2html(api)
    }
  }
}
</script>

<style scoped>
.container{
    width: 100vw;
    height: 100vh;
    text-align: left;
    padding: 5% 10% 0% 10%;
}
</style>
