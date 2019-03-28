import { showSearch } from "../../actions/types";

const initialState = {
    shows: []
}

const ShowSearch = (state = initialState, action) => {
    switch (action.type) {
        case showSearch: 
        return {
            ...state,
            shows: action.payload
        }
        default: 
        return state;
    }
}

export default ShowSearch;