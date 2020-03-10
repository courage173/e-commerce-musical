import {
    GET_PRODUCT_BY_ARRIVAL,
    GET_PRODUCT_BY_SELL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCT_TO_SHOP
} from '../actions/types'


export default function(state={},action){
    switch(action.type){
        case GET_PRODUCT_BY_SELL:{
            return {
                ...state,
                bySell: action.payload
            }
        
        }
        case GET_PRODUCT_BY_ARRIVAL:{
            return {
                ...state,
                byArrival: action.payload
            }
        
        }
        case GET_BRANDS:
            return {...state, brands: action.payload}
        case GET_WOODS:
            return {...state, woods: action.payload}

        case GET_PRODUCT_TO_SHOP:
            return {...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size
            }
        default:
            return state
    }
}