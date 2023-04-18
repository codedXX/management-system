import Vue from 'vue'
import Vuex from 'vuex'
import tabs from '@/store/tab';
import userTable from '@/store/userTable';
import menu from '@/store/menu';

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    tabs,
    userTable,
    menu
  }
})
