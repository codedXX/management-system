const tabs= {
  namespaced: true,
  state: {
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      }
    ]//面包屑数据
  },
  mutations: {
    addTab(state, tab) {
      if(state.tabList.findIndex(obj=>obj.name===tab.name)===-1)
      {
        state.tabList.push(tab)
      }else{
        return ;
      }
    }
  },
  actions: {
  },
}


export default tabs;
