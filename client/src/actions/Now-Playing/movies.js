import { moviesNowPlaying } from "../types";
import axios from "axios";  

const MoviesPlaying = () => {
    return function(dispatch) {
        axios.get('//api.themoviedb.org/3/movie/now_playing?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1&genre_ids=28')
        .then((res) => {
            let films = (res.data.results.slice(0, 3))
            let FilmsNowPlaying = []
            films.forEach((film) => {
            let obj = {
                type: 'film',
                backdrop: film.backdrop_path,
                poster: film.poster_path,
                title: film.title,
                overview: film.overview,
                vote: film.vote_average,
                id: film.id,
                genre: film.genre_ids
            }
                FilmsNowPlaying.push(obj)
            })
            console.log(FilmsNowPlaying)
            dispatch({
                type: moviesNowPlaying,
                payload: FilmsNowPlaying
            })
        })
    }
}

export default MoviesPlaying;