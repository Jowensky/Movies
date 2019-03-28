import { bannerFilms } from "../../actions/types";

const initialState = {
    films: [],
}

const FilmsBannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case bannerFilms:
        console.log(action.payload)
        return {
            ...state,
            films: action.payload
        }
        default: 
        return state;
    }
}

export default FilmsBannerReducer;