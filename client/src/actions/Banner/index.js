import { bannerFilms } from "../types";
import axios from "axios";  

const FilmsBanner = () => {
    return function(dispatch) {
        axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=2')
        .then(res => {
            let films = (res.data.results.slice(6, 10))
            let topRatedFilms = []
            films.forEach((film) => {
            let obj = {
                poster: film.backdrop_path,
                title: film.title
            }
                topRatedFilms.push(obj)
            })
            dispatch({
                type: bannerFilms,
                payload: topRatedFilms
            })
        })
        .catch((err) => console.log(err))
    }
}

export default FilmsBanner;