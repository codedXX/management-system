import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'
Mock.mock('/api/home/getData','get',function(){
  return homeApi.getStatisticalData();
})

Mock.mock('/api/user/getUser','get',userApi.getUserList)

Mock.mock('/api/user/delUser','post',userApi.deleteUser)

Mock.mock('/api/user/addUser','post',userApi.createUser)

Mock.mock('/api/user/updateUser','post',userApi.updateUser)

Mock.mock('/api/user/login','post',permissionApi.getMenu)