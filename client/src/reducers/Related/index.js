import { related } from "../../actions/types";

const initialState = {
    related: []
}

const RelatedReducer = (state = initialState, action) => {
    switch (action.type) {
        case related:
        return {
            ...state,
            related: action.payload
        }
        default: 
        return state;
    }
}

export default RelatedReducer;