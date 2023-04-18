<template>
  <el-container>
    <el-aside style="width:200px;background: rgb(84, 92, 100);">
      <common-aside style="height: 100%;"/>
    </el-aside>
    <el-container>
      <el-header>
        <common-header/>
      </el-header>
      <el-main>
        <common-tag style="height: 60px;"/>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script >

import CommonAside from '@/components/commonAside.vue';
import CommonHeader from '@/components/commonHeader.vue';
import CommonTag from '@/components/commonTag.vue';

export default {
  name:'Main',
  components: {CommonTag, CommonHeader, CommonAside}
}
</script>

<style lang="scss" scoped>
.el-container{
  height: 100%;
  &>.el-aside{
    height: 100%;
    background: blue;
    padding: 0;
    margin: 0;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
}
.el-header {
  //padding: 0;
  background-color: #333;;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>