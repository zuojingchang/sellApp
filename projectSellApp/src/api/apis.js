import axios from 'axios'

const IP = 'http://127.0.0.1:666'


export function getSeller(){
    return axios.get(IP + '/api/seller')
}

//商品导航请求
export function getGoods(){
    return axios.get(IP + '/api/goods')
}

//评价请求
export function getEvaluate(){
    return axios.get(IP + '/api/seller')
}

//评论
export function getComment(){
    return axios.get(IP + '/api/ratings')
}

//商家
export function getMerchant(){
    return axios.get(IP + '/api/seller')
}