<template>
  <div class="cardWrapper">
    <el-card class="box-card formWrapper">
      <p>系统登录</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :plain="true" @click="submitForm('ruleForm')" >登录</el-button>
<!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script >
import Mock from 'mockjs'
import Cookies from 'js-cookie'
import request from '@/utils/request';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:'Login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]
      }
    };
  }, methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const token=Mock.Random.guid();
          Cookies.set('token',token);
          request('/user/login','post',this.ruleForm)
            .then(res=>{
              if (res.code === 20000) {
                this.$router.push('/home')
                console.log('登录成功')
                this.$store.commit('menu/getMenu',res.data.menu)
                 this.$store.commit('menu/addMenu',this.$router)
                console.log(res)
              }else{
                this.$message.error('用户名密码错误');
              }
            })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();

    }
  }
}
</script>

<style lang="scss" scoped>
.cardWrapper{
  width:100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &>.formWrapper{
    display: flex;
    justify-content: center;
    & p {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
}
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>