import { showsNowPlaying } from "../types";
import axios from "axios";  
  
const ShowsPlaying = () => {
    return function(dispatch) {
        axios.get('//api.themoviedb.org/3/tv/on_the_air?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1')
        .then(res => {
            let shows = (res.data.results.slice(3, 5))
            let ShowsOnAir = []
            shows.forEach((show) => {
            let obj = {
                type: 'show',
                backdrop: show.backdrop_path,
                poster: show.poster_path,
                title: show.original_name,
                overview: show.overview,
                vote: show.vote_average,
                id: show.id
            }
            ShowsOnAir.push(obj)
            })
            dispatch({
                type: showsNowPlaying,
                payload: ShowsOnAir
            })
        })
    }
} 

export default ShowsPlaying