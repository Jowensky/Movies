import { cast } from "../../actions/types";

const initialState = {
    casts: []
}

const CastMembersReducer = (state = initialState, action) => {
    switch (action.type) {
        case cast:
        return {
            ...state,
            casts: action.payload
        }
        default: 
        return state;
    }
}

export default CastMembersReducer;