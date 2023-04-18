<template>
  <div>
    <el-tag
      v-for="tag in tags"
      :key="tag.path"
      :type="tag.type"
      :closable="tag.name!=='home'"
      :class="$route.name===tag.name?'aaa':''"
      @click="selectTag(tag)"
    >
<!--      dark / light / plain-->
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>


export default {
  name: 'commonTag',
  methods: {
    selectTag(tag) {
      if(this.$route.path===tag.path)
      {
        return ;
      }else{
        console.log(this.$route)
        this.$router.push(tag.path)
      }
    }
  },
  computed: {
    tags() {
      return this.$store.state.tabs.tabList;
      // return this.$store.state.tabList
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tag{
  background: white;
  color: #4093ff;
  height: 32px;
  font-size: 12px;
  margin-right: 15px;
}
.aaa{
  background: green;
  color: white;
}
//.el-tag ::v-deep .el-tag__close{
//  color: white;
//}
</style>