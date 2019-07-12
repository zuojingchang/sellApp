<template>
    <div class="shopcar">
        <div v-for="(item,i) in shopcarFoods" :key="i"  class="right_pic">
            <div>
                <img :src="item.icon" alt="">
            </div>
            <div class="right_info">
                <h5>{{ item.name }}</h5>
                <p>月售：{{ item.sellCount}}份&emsp;好评率：{{item.rating}}%</p>
                <p class="rightPrice"> 
                    <Row>
                        <Col span="16" class="price">
                            &yen;{{ item.price }}
                        </Col>
                        <Col span="3">
                            <Icon @click="clickFoodDec(item.id)" v-show="item.num > 0" style="color:#0088FF;font-size:18px" type="md-remove-circle" />
                        </Col>
                        <Col span="2">
                            <label>{{ item.num }}</label>
                        </Col>
                        <Col span="3">
                            <Icon @click="clickFoodAdd(item.id)" v-show="item.num > 0" style="color:#0088FF;font-size:18px" type="md-add-circle" />
                        </Col>
                    </Row>  
                </p>
            </div>       
        </div> 
    </div>
</template>

<script>
    export default {
        computed:{
            shopcarFoods(){
                return this.$store.getters.shopcarFoods
            }
        },
        methods:{
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
        }
    }
</script>

<style lang="less" scoped>
    .shopcar{
        .right_pic{
            display: flex;
            align-items: center;
            justify-content:space-around;
            flex-wrap: wrap;
            img{
                width: 50%;
                border-radius: 5px;
            }
            h5{
                font-size: 14px;
            }
            .riget_info{
                width: 180px;
                 /deep/  .rightPrice{
                  
                        font-size: 16px;
                        font-weight: bold;
                        color: #f00;
                     
                    label{
                        color: red;
                    }
                }
            }
        }        

    }
</style>