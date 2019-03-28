import { movieSearch } from "../../actions/types";

const initialState = {
    movies: []
}

const MovieSearch = (state = initialState, action) => {
    switch (action.type) {
        case movieSearch:
        return {
            ...state,
            movies: action.payload
        }
        default: 
        return state;
    }
}

export default MovieSearch;