import { genre } from "../../actions/types";

const initialState = {
    genres: [],
}

const Genre = (state = initialState, action) => {
    switch (action.type) {
        case genre:
        return {
            ...state,
            genres: action.payload
        }
        default: 
        return state;
    }
}

export default Genre;