<template>
  <div class="header">
    <div class="l-content">
      <el-button circle:false class="ibutton" icon="el-icon-menu" size="mini"></el-button>
      <span>首页</span>
  </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    <img class="user" src="../assets/images/user.png" alt="">
  </span>
        <el-dropdown-menu slot="dropdown" :split-button="true">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
<!--        <el-dropdown-menu slot="dropdown">-->
<!--          <el-dropdown-item>个人中心</el-dropdown-item>-->
<!--          <el-dropdown-item command="cancel">退出</el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: 'commonHeader',
  methods:{
    handleCommand(command) {
      if (command === 'cancel') {
        Cookies.remove('token');
        Cookies.remove('menuList');
        Cookies.remove('menu')
        this.$router.push('/login')
      }
    },
    cancel(){
     console.log('log')
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &>.l-content {
    height: 100%;
    color: #fff;
    & > .ibutton {
      margin-right: 20px;
    }
  }
  &>.r-content{
    height: 100%;
    & .user{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.button {
  font-weight: 400;
}
</style>