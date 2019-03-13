import { video } from "../actions/types";


const initialState = {
    item: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case video:
        return {
            ...state,
            item: action.payload
        }
        default: 
        return state;
    }
}