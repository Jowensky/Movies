import { movieInfo, background} from "../actions/types";

const initialState = {
    imbd: {},
    poster: {}
}

export function info (state = initialState, action) {
    switch (action.type) {
        case movieInfo:
        return {
            ...state,
            imbd: action.payload
        }
        default: 
        return state;
    }
}

export function screenBackground (state = initialState, action) {
    switch (action.type) {
        case background:
        return {
            ...state,
            poster: action.payload
        }
        default: 
        return state;
    }
}