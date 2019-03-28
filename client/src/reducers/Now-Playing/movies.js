import { moviesNowPlaying } from "../../actions/types";

const initialState = {
    movies: []
}

const MoviesPlayingReducer = (state = initialState, action) => {
    switch (action.type) {
        case moviesNowPlaying:
        return {
            ...state,
            movies: action.payload
        }
        default: 
        return state;
    }
}

export default MoviesPlayingReducer;