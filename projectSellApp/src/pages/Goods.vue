<template>
    <div class="goods">
        <!-- 左侧导航 -->
        <div class="left_div">
            <ul class="content">
                <div :class="{ left_title:true,selected : curIndex == index }" 
                v-for="(nav,index) in list" 
                :key="index" 
                @click="clickLeftTitle(index)">
                    <label>{{ nav.name }}</label>
                </div>
            </ul>
        </div>
        <!-- 右侧内容 -->
        <div class="right_div">
            <ul class="content" id="right_ul">
                <div :id="index" v-for="(goods,index) in list" :key="index">
                    <h4>{{ goods.name }}</h4>
                    <div v-for="(item,i) in goods.foods" :key="i"  class="right_pic">
                        <div>
                            <img :src="item.icon" alt="">
                        </div>
                        <div class="riget_info">
                            <h5>{{ item.name }}</h5>
                            <p>月售：{{ item.sellCount}}份&emsp;好评率：{{item.rating}}%</p>
                            <p class="rightPrice"> 
                                <Row>
                                    <Col span="16">
                                        &yen;{{ item.price }}
                                    </Col>
                                    <Col span="3">
                                        <Icon @click="clickFoodDec(item.id)" :class="{'isShow':!item.num > 0}" style="color:#0088FF;font-size:18px" type="md-remove-circle" />
                                    </Col>
                                    <Col span="2">
                                        <label :class="{'isShow':!item.num > 0}">{{ item.num }}</label>
                                    </Col>
                                    <Col span="3">
                                        <Icon @click="clickFoodAdd(item.id)" style="color:#0088FF;font-size:18px" type="md-add-circle" />
                                    </Col>
                                </Row>  
                            </p>
                        </div>       
                    </div> 
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import { getGoods  } from '../api/apis'
    import BScroll from 'better-scroll'
    export default {
        data (){
            return{
                //左侧当前选中中
                curIndex : 0,
                //元素高度数组
                heightArr : []
            }
        },
        computed:{
            list(){
                return this.$store.state.list
            }
        },
        created(){
            //初始化请求数据
            this.$store.dispatch('initlist')
        },
        mounted(){
            let left = document.querySelector('.left_div')
            let right = document.querySelector('.right_div')
            this.left_scroll = new BScroll(left,{
                click : true
            })
            this. right_scroll = new BScroll(right,{
                probeType : 3,
                click : true
            })
            this.right_scroll.on('scroll',obj => {
                //当前滚动的距离
                let _y = Math.abs(obj.y)
                if(_y < this.heightArr[0]){
                    this.curIndex = 0
                }else{
                    let total = 0;
                    for(let i = 0; i < this.heightArr.length; i++){
                        let height = this.heightArr[i];
                        total += height;     
                        if(_y >= total){
                            this.curIndex = i + 1
                        }
                    }
                }              
            })
        },
        updated (){
            //只运行一次 提高代码的性能
            if(this.heightArr.length == 0){
                let ul = document.getElementById('right_ul')
                for(let elt of ul.childNodes){
                    this.heightArr.push(elt.offsetHeight)
                }
            }          
        },
        methods :{
            clickLeftTitle(index){
                this.curIndex = index
                this.right_scroll.scrollToElement(document.getElementById(index),200)
            },
            clickFoodDec(id){
                this.$store.commit({
                    type : 'changeFoodNum',
                    id,
                    num :-1
                }) 
            },
            clickFoodAdd(id){
                this.$store.commit({
                    type : 'changeFoodNum',
                    id,
                    num : 1
                })
            }
        },
        
    }
</script>

<style lang="less" scoped>
    .goods{ 
        display: flex;
        height:440px;
        .left_div{
            width: 100px;
            overflow: auto;
            .left_title{
                display: flex;
                height: 50px;
                align-items: center;
                padding: 10px;
                background-color: #f4f5f7;
                border-bottom: 1px solid #e4e5e7;
            }
            .selected{
                background-color: #fff;
            }
        }
        .right_div{
            width: 100%;
            overflow:auto;
            img{
                padding: 10px;
                width: 80px;
            }
            .right_pic{
                display: flex;
                align-items: center;
                justify-content:space-around ;
                flex-wrap: wrap;
                h5{
                    font-size: 14px;
                }
                .riget_info{
                    width: 180px;
                    .rightPrice{
                        font-size: 16px;
                        font-weight: bold;
                        color: #f00;
                        label{
                            color: #222;
                        }
                    }
                }
            }        
        }
        .isShow{
            visibility: hidden;
        }  
    } 
</style>