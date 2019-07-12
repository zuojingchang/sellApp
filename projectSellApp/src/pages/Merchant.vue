<template>
    <div class="merchant">
        <ul class="content">
            <div class="mer_top">
                <div>
                    <h3>{{ goodsList.name }}</h3>
                    <p>
                        <Rate disabled allow-half v-model="monthSell" />
                        <span>（661）月售690单</span>
                    </p>
                </div>
                <div>
                    <p><Icon type="md-heart" style="font-size:20px;color:#F01414" /></p>
                    <p>已收藏</p>
                </div>
            </div>
            <!-- 配送信息 -->
            <div class="disMessage">
                <div>
                    <p>起送价</p>
                    <p><label>20</label>元</p>
                </div>
                <div>
                    <p>商家配送</p>
                    <p><label>4</label>元</p>
                </div>
                <div class="dis_end_div">
                    <p>平均配送时间</p>
                    <p><label>39</label>分钟</p>
                </div>
            </div>
            <!-- 公告 -->
            <div class="notice">
                <h3>公告与活动</h3>
                <p>{{ goodsList.bulletin }}</p>
            </div>
            <div class="activity_div">
                <div class="activity" v-for="(item,index) in goodsList.supports" :key="index">
                    <p>{{ item.description }}</p>
                </div>
            </div>
            <!-- 商家实景 -->
            <div class="swiper">
                <h3>商家实景</h3>
                <swiper :options="swiperOption"  ref="mySwiper">
                    <swiper-slide v-for="(item,index) in goodsList.pics" :key="index">
                        <img :src="item" alt="">
                    </swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-scrollbar"   slot="scrollbar"></div>
                </swiper>       
            </div>
            <!-- 商家信息 -->
            <div class="info_div">
                <h3>商家信息</h3>
                <div class="info" v-for="(item,index) in goodsList.infos" :key="index">
                    <p>{{ item }}</p>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
    import { getMerchant } from '../api/apis'
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                monthSell : 4,
                goodsList : [],
                //swiper组件
                
                //notNextTick: true,
                swiperOption: {
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                        slidesPerView: 2
                    }
                //     // swiper optionss 所有的配置同swiper官方api配置
                //     // autoplay: 3000,
                //     direction: 'horizontal',
                //     grabCursor: true,
                //     setWrapperSize: true,
                //     autoHeight: true,
                //     pagination: '.swiper-pagination',
                //     paginationClickable: true,
                //     prevButton: '.swiper-button-prev',
                //     nextButton: '.swiper-button-next',
                //     scrollbar: '.swiper-scrollbar',
                //     mousewheelControl: true,
                //     observeParents: true,
                //     // if you need use plugins in the swiper, you can config in here like this
                //     // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                //     debugger: true,
                //     // swiper callbacks
                //     // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
                //     onTransitionStart(swiper){
                //         console.log(swiper)
                //     },
                }
            }
        },
        async created (){
            let res = await getMerchant()
            let data = res.data.data;
            this.goodsList = data 
        },
        mounted(){
            let merchant = document.querySelector('.merchant')
            let merchant_scroll = new BScroll(merchant)
        }
    }
</script>

<style lang="less" scoped>
    .merchant{
        /deep/ .ivu-rate-star{
                    margin-right:  0;
                }
        height: 440px;
        overflow: auto;
        .mer_top{
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 70px;
        }
        .disMessage{
            margin: 0 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 90px;
            border-top:1px solid #EBEBEB;
            .dis_end_div{
                border : none;
            }
            label{
                font-size: 30px;
            }
        }
        .notice{
            margin: 0 20px;
            p{
                color: #F53A3A;
                line-height: 24px;
            }
        }
        .activity_div{
            margin-top: 20px;
             .activity{
                margin:  0 20px;
                display: flex;
                align-items: center;
                height: 50px;
                border-top: 1px solid #EBEBEB;
            }
        }
        .swiper{
            margin: 20px;
            width: 310px !important;
            .swiper-container{
                width: 160px !important;
                .swiper-wrapper{
                    .swiper-slide{
                        width: 160px !important;
                        height: 160px !important;
                        margin: 10px 0px 0 0;
                        img{
                            width: 90%;
                            height: 90%;
                            border-radius: 10px;
                        }
                    }  
                }
            }
        }
        .info_div{
            margin: 20px;
            h3{
                margin-bottom: 20px;
            }
            .info{
                margin:  0 20px;
                display: flex;
                align-items: center;
                height: 50px;
                border-top: 1px solid #EBEBEB;
            }
        }
    }
</style>