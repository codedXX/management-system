<template>
  <div style="width: 100%;">
    <el-button type="primary" @click="dialogVisible = true">+新增</el-button>

    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="提示"
      width="50%">

      <el-form
        ref="ruleForm"
        :inline="true"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" required>
          <el-col>
            <el-form-item prop="birth">
              <el-date-picker v-model="ruleForm.birth" placeholder="选择日期" style="width: 100%;"
                              type="date"
                              value-format="yyyy-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="ruleForm.addr"></el-input>
        </el-form-item>

        <!--        <el-form-item>-->
        <!--          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
        <!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--        </el-form-item>-->
      </el-form>
      <div class="subButton">
        <el-button @click="()=>{dialogVisible = false;this.ruleForm={}}">取 消</el-button>
        <el-button type="primary" @click="addorupt">确 定</el-button>
      </div>
    </el-dialog>
    <div style="width: 100%;">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="姓名"
          prop="name"
          >
        </el-table-column>
        <el-table-column
          label="年龄"
          prop="age"
          >
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sex">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.sex === '0'?'女':'男'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="出生日期"
          prop="birth">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="addr">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="$store.state.userTable.userList.length"
        @current-change="updatePage"
        class="page"
      >
      </el-pagination>
<!--      <el-pagination-->
<!--        :page-size="20"-->
<!--        :pager-count="11"-->
<!--        layout="prev, pager, next"-->
<!--        :total="1000">-->
<!--      </el-pagination>-->
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';

export default {
  name: 'User',
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    handleEdit(index, row) {
      this.dialogVisible=true;
      this.ruleForm=row
      if(this.ruleForm.sex==='1')
      {
        this.ruleForm.sex='男'
      }
      if (this.ruleForm.sex === '0') {
        this.ruleForm.sex='女'
      }
    },
    handleDelete(index, row) {
      request('/user/delUser','post',{id: row.id})
      this.$store.commit('userTable/delUser',row.id)
    },
    addorupt(){
      //新增数据
      if(this.ruleForm.id===undefined){
        // name, addr, age, birth, sex
        this.dialogVisible = false
        if(this.ruleForm.sex==='男')
        {
          this.ruleForm.sex='1'
        }
        if (this.ruleForm.sex = '女') {
          this.ruleForm.sex='0'
        }
        request('user/addUser','post',this.ruleForm)
          .then(res=>{
            this.$store.commit('userTable/addUser',res.data.user)
            this.ruleForm={}
          })
      }
      //修改数据
      if (this.ruleForm.id !== undefined) {
        this.dialogVisible = false
        if(this.ruleForm.sex==='男')
        {
          this.ruleForm.sex='1'
        }
        if (this.ruleForm.sex = '女') {
          this.ruleForm.sex='0'
        }
        request('user/updateUser','post',this.ruleForm)
          .then(res=>{
            console.log('res',res)
            this.$store.commit('userTable/updateUser',this.ruleForm)
            this.ruleForm={}
          })
      }
    },
    updatePage(){
      console.log('update')
    }
  },
  mounted(){
    request('/user/getUser','get')
      .then(res=>{
        this.$store.commit('userTable/getUserList',res.list)
      })
  },
  computed:{
    tableData(){
      return this.$store.state.userTable.userList;
    }
  }
};
</script>

<style lang="scss" scoped>
.subButton{
  display: flex;
  justify-content: flex-end;
}
.page{
  display: flex;
  justify-content: center;
  font-size: 20px;
}
</style>