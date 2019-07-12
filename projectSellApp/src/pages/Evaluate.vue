<template>
    <div class="evaluate">
        <ul class="content">
            <div class="synthesize">
                <div class="synthesize_left">
                    <h2>{{ evaluate.score }}</h2>
                    <p class="title">综合评分</p>
                    <p>高于周边商家{{ evaluate.rankRate }}%</p>
                </div>
                <div class="synthesize_right">
                    <p>服务态度&emsp;
                        <Rate class="xin" disabled allow-half v-model="evaluate.foodScore" />{{ evaluate.foodScore }}
                    </p>
                    <p>服务态度&emsp;
                        <Rate class="xin" disabled allow-half v-model="evaluate.serviceScore" />{{ evaluate.serviceScore }}
                    </p>
                    <p>送达时间&emsp;{{ evaluate.deliveryTime }}分钟</p>
                </div>
            </div>
            <div class="spanitem">
                <span class="span1">全部57</span>
                <span class="span2">满意47</span>
                <span class="span3">不满意10</span>
                <p><Icon type="md-checkmark-circle" size="24" style="color:#76D572" />
                    只看有内用的评价
                </p>
            </div>
            <div class="comment" v-for="(item,index) in comment" :key="index">
                <div class="comment_left">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="comment_right">
                    <div class="nameTime">
                        <p>{{ item.username }}</p>
                        <p>{{ item.rateTime | changeFilter }}</p>
                    </div>
                    <p >
                        <Rate disabled allow-half v-model="item.score" />
                        {{ item.deliveryTime }}分钟送达
                    </p>
                    <p>{{ item.text }}</p>
                </div>
            </div>
        </ul>    
    </div>
</template>

<script>
    import { getEvaluate,getComment } from '../api/apis'
    import moment from 'moment'
    import BScroll from 'better-scroll'
    export default {
        data (){
            return {
                //定义数组用于保存数据
                evaluate : [],
                comment :[],    //评论数组
            }
        },
        async created(){
            let res1 = await getEvaluate()
            let res2 = await getComment()
            let data1 = res1.data.data
            let data2 = res2.data.data
            this.evaluate = data1 
            this.comment = data2
        },
        filters : {
            changeFilter(rateTime){
               return moment(rateTime).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        mounted (){
            let evaluate = document.querySelector('.evaluate')
            let evaluate_scroll = new BScroll(evaluate)
        }
    }
    
</script>

<style lang="less" scoped>
    .evaluate{
        height: 440px;
        overflow: auto;
        /deep/ .ivu-rate-star{
                    margin-right:  0;
                }
        .synthesize{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .synthesize_left{
                line-height: 24px;
                padding: 14px;
                width: 40%;
                h2{
                    color:#FC9903;
                    padding-left: 28px;
                }
                .title{
                    padding-left: 18px;
                }
            }
            .synthesize_right{
                .xin{
                    font-size: 16px;
                }
                line-height: 24px;                
            }
        }
        
        .spanitem{
            margin:0 20px;
            span{
                display: inline-block;
            }
            .span1{
                width: 50px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #fff;
                border-radius: 3px;
                background-color: #00A0DC;
                margin-right: 20px;
            }
            .span2{
                width: 50px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #4D555C;
                border-radius: 3px;
                margin-right: 20px;
                background-color: #CCECF7; 
            }
            .span3{
                width: 60px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #4D555C;
                border-radius: 3px;
                background-color: #EAEBED;
            }
            p{
                line-height: 60px;
            }
        }
        .comment{
            border-top: 1px solid #ccc;
            display: flex;
            .comment_left{
                width: 80px;
                img{
                    width: 120%;
                    height: 90%;
                    border-radius: 50%;
                    padding: 10px;
                }
            }
            .comment_right{
                padding-left: 20px;
                width: 100%;
                .nameTime{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;
                    padding-right: 10px;
                }
                .ivu-rate{
                        font-size: 16px;
                    }
            }
        }
    }
    
</style>