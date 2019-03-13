import { combineReducers } from 'redux';
import { info, screenBackground}  from './movie-reducers';
import youtubeReducer  from './youtube-reducers'

export default combineReducers({
    youtube: youtubeReducer,
    movieInfo: info,
    background: screenBackground
})