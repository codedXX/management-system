<template>
  <div>
    <!--        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
    <!--          <el-radio-button :label="false">展开</el-radio-button>-->
    <!--          <el-radio-button :label="true">收起</el-radio-button>-->
    <!--        </el-radio-group>-->
    <el-menu :collapse="isCollapse"
             active-text-color="yellow"
             background-color="#545c64"
             class="el-menu-vertical-demo"
             default-active="1-4-1"
             router:true
             text-color="#fff"
             @close="handleClose"
             @open="handleOpen"
    >
      <div class="title">
        <span>通用后台管理系统</span>
      </div>
      <el-menu-item
        v-for="menu in noChildren"
        :key="menu.path"
        :index="menu.path"
        @click="clickMenu(menu)"
        >
        <i :class="`el-icon-${menu.icon}`"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>

      <el-submenu v-for="menu in hasChilrend" :key="menu.path" :index="menu.label">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ menu.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in menu.children"
            :key="item.path"
            :index="item.path"
            @click="clickMenu(item)"
          >{{ item.label }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: 'commonAside',
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    clickMenu(menu) {
      if (this.$route.path === menu.path) {
        return;
      } else {
        this.$store.commit('tabs/addTab',menu)
        this.$router.push(menu.path);
      }
    }
  },
  computed: {
    noChildren() {
      let nochildren = this.menuData.filter(item => item.hasOwnProperty('children') === false);
      return nochildren;
    },
    hasChilrend() {
      let haschildren = this.menuData.filter(item => item.hasOwnProperty('children') === true);
      return haschildren;
    },
    menuData(){
      //判断当前数据，如果缓存中没有，那么从当前store中去获取
      return JSON.parse(Cookies.get('menuList')) || this.$store.state.menu.menuList
      // console.log(this.$store.state.menu.menuList)
      // return this.$store.state.menu.menuList
    }
  }
};

</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border: none;
}

.el-menu {
  text-align: left;
  height: 100%;
}

.title {
  height: 48px;
  line-height: 48px;
  color: #fff;
  text-align: center;
  font-size: 16px;
}
</style>