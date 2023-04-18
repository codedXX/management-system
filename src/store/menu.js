import Cookies from 'js-cookie';
const menu={
  namespaced:true,
  state:{
    menuList:[]
  },
  mutations:{
    getMenu(state, list) {
      state.menuList=list
      console.log('list',JSON.stringify(list))
      Cookies.set('menuList', JSON.stringify(list));
    },
    addMenu(state,router){
      //判断缓存中是否有数据
      if(!Cookies.get('menuList')) return ;
      const menu = JSON.parse(Cookies.get('menuList'));
      state.menu=menu
      //组装动态路由的数据
      const menuArray=[];
      menu.forEach(item=>{
        if(item.children)
        {
          item.children=item.children.map(item=>{
            item.component = () => import (`../views/${item.url}`)
            return item;
            // console.log(x.component)
          })
          menuArray.push(...item.children)
        }else{
          item.component = () => import (`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      // console.log('menuArray',menuArray)
      menuArray.forEach(item=>{
        //添加到主路由这
        router.addRoute('main',item)
      })

    }
  }
}

export default menu;