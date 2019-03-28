import { showsNowPlaying } from "../../actions/types";

const initialState = {
    shows: []
}

const ShowsPlayingReducer = (state = initialState, action) => {
    switch (action.type) {
        case showsNowPlaying:
        return {
            ...state,
            shows: action.payload
        }
        default: 
        return state;
    }
}

export default ShowsPlayingReducer;