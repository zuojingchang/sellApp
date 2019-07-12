<template>
    <div class="nav">
        <div class="top_div">
            <img :src="avatar">
            <div class="top_title">
                <h2><img src="../assets/imgs/brand@2x.png" /><span>{{ name }}</span></h2>
                <p>{{ description }}/{{ deliveryTime }}分钟送达</p>
                <p><img src="../assets/imgs/decrease_1@2x.png"><span>在线支付满28减5，满50减10</span><span class="_discounts">5个 > </span> </p>     
            </div>
        </div>
        <div class="_bulletin"><img src="../assets/imgs/bulletin@2x.png">{{ bulletin }}</div>
        <div class="title_div">
            <router-link to="/">商品</router-link>
            <router-link to="/evaluate">评价</router-link>
            <router-link to="/merchant">商家</router-link>
        </div>
       
            <!-- 路由出口 -->
            <router-view></router-view>
        <!-- 购物车 -->
        <div class="bottom_div">
            <Poptip placement="top-start" width="320">
                <div class="imgDiv">
                     <img :src="getShopcarSrc" alt="">
                </div>
            <div class="api" slot="content">
                <shopcar></shopcar>
            </div>
            </Poptip>
            <span class="totalprice">总价格：{{ getTotalPrice }}&ensp;&yen;</span>
            <span class="UpToSend">&yen;20起送</span>
        </div>
       
    </div>
</template>

<script>
    import { getSeller } from '../api/apis'
    import shopcar from '../pages/Shopcar.vue'
    export default {
        components : {
            shopcar,
        },
        data (){
            return {
                avatar : '',
                name : '',
                description : '',
                deliveryTime : '',
                bulletin : '', 
            }
        },
        computed:{
            //购物车图片切换
            getShopcarSrc(){
                if(this.$store.getters.shopcarFoods.length > 0){
                    return require('../assets/imgs/shopcar_on.png')
                }
                return require('../assets/imgs/shopcar_off.png')
            },
            //总价格
            getTotalPrice(){
                let total = 0;
                for(let obj of this.$store.getters.shopcarFoods){
                    total += obj.num * obj.price;
                }
                return total
            }
        },
        methods : {
            //theme3: 'light' //左侧导航
        },
        async created (){
            //发送请求
            let res = await getSeller()
            //接收响应数据
            let data = res.data.data
            //保存数据到this中
            this.avatar = data.avatar;
            this.name = data.name;
            this.description = data.description;
            this.deliveryTime = data.deliveryTime;
            this.bulletin = data.bulletin;
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .top_div{
        display: flex;
        // background-color: #493C33;
        background-color: #0088FF;
        &>img {
            margin:15px;
            width: 20%;
            height: 20%; 
            border-radius: 5px;
        }
        .top_title{  
            color: #fff;    
            h2{
                display: flex;
                justify-content: left;
                align-items: center;  
                margin-top: 20px;
                &>img{
                    width: 14%;
                    margin-right: 5px;
                }
            }
            p{
                font-size: 14px;
                line-height: 24px;
            }
            p:last-child{
                display: flex;
                justify-content: left;
                align-items: center; 
                font-size: 12px; 
                position: relative;
                &>img{
                    width: 6%;
                    margin-right: 5px;
                }
                line-height: 24px;
                ._discounts{
                    position: absolute;
                    right: -14px;
                    background-color:#00A8FF;
                    border-radius: 10px;
                    width: 46px;
                    text-align: center;
                
                }
            }
        }
    }
    ._bulletin{
        background-color: #00A8FF;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        display: flex;
        align-items: center; 
        color: #fff;
        font-size: 12px;
        &>img{
            margin: 10px 8px;
            width: 7%;
            line-height: 20px;
        } 
    }
    .title_div{
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        line-height: 40px;
        color: #656567;
    }
    .bottom_div{
        height: 50px;
        width: 100%;
        background-color: #3b3b3c;
        position: fixed;
        bottom: 0;
        .imgDiv{
            width: 50px;
            height: 50px;
            img{
                margin:5px 10px 0 10px;
                width:80%;
            }
        }
        .totalprice{
            width: 130px;
            height: 50px;
            display: inline-block;
            text-align: center;
            font-size: 20px;
            color: #fff;
            position: absolute;
            top:20%;
        }
        .UpToSend{
            font-size: 20px;
            color: #fff;
            background-color: #535356;
            text-align: center;
            display: inline-block;
            position: absolute;
            right: 0;
            width: 90px;
            height: 100%;
            line-height: 50px;
        }
    } 
    
</style>