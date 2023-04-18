import request from '@/utils/request';
const userTable={
  namespaced:true,
  state:{
    userList:[]
  },
  mutations:{
    getUserList(state,userList){
      state.userList=userList
    },
    delUser(state,id){
      state.userList=state.userList.filter(item=>
      item.id!==id)
    },
    addUser(state,user)
    {
      state.userList.unshift(user)
    },
    updateUser(state,user)
    {
      state.userList.forEach(item=>{
        if(item.id===user.id)
        {
          item=user
        }
      })
    }
  }
}

export default userTable;