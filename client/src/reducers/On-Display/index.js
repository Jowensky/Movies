import { selected } from "../../actions/types";

const initialState = {
    selected: {}
}

const OnDisplay = (state = initialState, action) => {
    switch (action.type) {
        case selected:
        return {
            ...state,
            selected: action.payload
        }
        default: 
        return state;
    }
}

export default OnDisplay;