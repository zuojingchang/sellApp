import Vue from 'vue'
import Vuex from 'vuex'
import { getSeller } from './api/apis'
Vue.use(Vuex)

var store = new Vuex.Store({
    state : {
        name : '孙涛',
        list : []
    },
    mutations:{
        changeName(store,obj){
            store.name = obj.name  
        },
        initlist(store,obj){
            store.list = obj.data
        }
    },
    actions : {
        async initlist(context){
            let res = await getSeller()
            // console.log(res.data.data);
            context.commit({
                type : 'initlist',
                data : res.data.data
            })
        }
    }
})

store.dispatch('initlist')
// store.commit('changeName')
// store.commit({
//     type:'changeName',
//     name:'傻屌孙涛'
// })
console.log(store.state);

// console.log(store.state.name);
export default store;