import Vue from 'vue'
import Vuex from 'vuex'
import { getGoods } from './api/apis'
Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        list : []   //商品数据
    },
    mutations : {
        initlist(store,obj){
            store.list = obj.data
        },
        //改变商品数量
        changeFoodNum(state,param){
            //param.id 主要改变当前数量食品的id
            //param.num 要改变的数量 -1,1
            for(let obj of state.list){
                for(let food of obj.foods){
                    if(food.id == param.id){
                        food.num += param.num
                        return
                    }
                }
            }
        }    
    },
    actions : {
        async initlist(context){
            let res = await getGoods()

            //前端制作数据
            let id = 0;
            let arr = res.data.data
            // console.log(arr);
            for(let obj of arr){
                // console.log(obj);
                for(let food of obj.foods){
                    food.num = 0;
                    food.id = id++
                }
            }
            //提交commit
            context.commit({
                type : 'initlist',
                data : arr
            })
        }
    },
    getters : {
        //过滤所有数量大于0的数组，返回食品数量大于0的数组
        shopcarFoods(state){
            let arr =[]
            for(let obj of state.list){
                for(let food of obj.foods){
                    if(food.num > 0){
                        arr.push(food)
                    }
                }
            }
            return arr;
        }
    }
})