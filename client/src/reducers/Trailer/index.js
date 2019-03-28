import { trailer } from "../../actions/types";

const initialState = {
    trailer: {}
}

const TrailerReducer = (state = initialState, action) => {
    switch (action.type) {
        case trailer:
        return {
            ...state,
            trailer: action.payload
        }
        default: 
        return state;
    }
}

export default TrailerReducer;