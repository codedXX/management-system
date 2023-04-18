<template>
  <div id="app">
<!--    <Main/>-->
    <router-view/>
  </div>
</template>

<script setup>
import Main from '@/views/Main.vue';
</script>

<style lang="scss">
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
html,body,#app{
  height: 100%;
}

</style>