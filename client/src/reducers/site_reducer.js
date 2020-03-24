import {
    GET_SITE_DATA,
    UPDATE_DATA_USER
} from '../actions/types';

 

export default function(state={},action){
    switch(action.type){
        case GET_SITE_DATA: 
            return {
                ...state,
                siteData: action.payload
            }
        case UPDATE_DATA_USER:
            return {
                ...state,
                siteData: action.payload.siteInfo
            }
        default:
            return state;
    }
}

