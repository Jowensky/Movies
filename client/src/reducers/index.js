import { combineReducers } from 'redux';
import CastMembersReducer from './Cast-Members';
import Listings from './Listings';
import OnDisplay from './On-Display';
import RelatedReducer from './Related';
import MovieSearch  from './Search/movie';
import ShowSearch from './Search/show';
import TrailerReducer from './Trailer';
import MoviesPlayingReducer from './Now-Playing/movies';
import ShowsPlayingReducer from './Now-Playing/shows';
import GenreReducer from './Genre'

export default combineReducers({
    OnDisplay,
    TrailerReducer,
    CastMembersReducer,
    RelatedReducer,
    Listings,
    ShowSearch,
    MovieSearch,
    MoviesPlayingReducer,
    ShowsPlayingReducer,
    GenreReducer
});