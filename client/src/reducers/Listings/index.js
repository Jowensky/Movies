import { listing } from "../../actions/types";

const initialState = {
    list: [],
}

const Listings = (state = initialState, action) => {
    switch (action.type) {
        case listing:
        return {
            ...state,
            list: action.payload
        }
        default: 
        return state;
    }
}

export default Listings;