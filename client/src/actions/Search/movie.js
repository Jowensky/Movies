import { movieSearch } from "../types";
import axios from "axios";

const SearchFilm = data => {
    return function(dispatch) {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&query=${data}&page=1&include_adult=false`)
      .then(res => {
        let retrival = res.data.results.slice(0, 10)
        let search = []
        retrival.forEach(film => {
          let obj = {
            backdrop: film.backdrop_path,
            poster: film.poster_path,
            title: film.title,
            overview: film.overview,
            vote: film.vote_average,
            id: film.id
          }
          search.push(obj)
        })
        dispatch({
          type: movieSearch,
          payload: search
        })
      })
    }
}

export default SearchFilm;