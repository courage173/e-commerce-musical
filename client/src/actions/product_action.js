import axios from 'axios';
import { PRODUCT_SERVER } from '../components/utils/misc';
import {
    GET_PRODUCT_BY_ARRIVAL,
    GET_PRODUCT_BY_SELL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCT_TO_SHOP
    } from './types'




export function getProductBySell(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`).
    then(response => response.data)
    return {
        type: GET_PRODUCT_BY_SELL,
        payload: request
    }
}

export function getProductByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`).
    then(response => response.data)
    return {
        type: GET_PRODUCT_BY_ARRIVAL,
        payload: request
    }
}


export function getProductToShop(skip, limit,filters =[], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }
    
    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.articles
                    ];
                    console.log(newState)
                    return {
                        size: response.data.size,
                        articles: newState
                    }
                });

    return {
        type: GET_PRODUCT_TO_SHOP,
        payload: request
    }

}

//Categories
 

export function getBrands(){
    const request = axios.get(`${PRODUCT_SERVER}/brand`).
    then(response => response.data)
    
    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function getWoods(){
    const request = axios.get(`${PRODUCT_SERVER}/wood`).
    then(response => response.data)
    return {
        type: GET_WOODS,
        payload: request
    }
}
