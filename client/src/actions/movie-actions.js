import { movieInfo, background} from "./types";
import axios from "axios";

export function Info(data) {
  return function(dispatch) {
  axios
    .get(`//omdbapi.com/?apikey=a9f6407&t=${data}`)
    .then((res) => {
      const movieTopics = {
      director: res.data.Director,
      rated: res.data.Rated,
      plot: res.data.Plot,
      runtime: res.data.Runtime,
      genre: res.data.Genre,
      title: res.data.Title,
      year:  res.data.Year
      }
      dispatch({
        type: movieInfo,
        payload: movieTopics
      })
    })
    .catch(err => console.log(err))
  }
}

export function Poster(data) {
  return function(dispatch) {
  axios.get("//api.themoviedb.org/3/search/movie?api_key=d3bd842cd067b7bd659924a258f4ce8d", {
    params: {
      query: data.query,
      year: data.year
    }
  }) 
  .then(res => {
    const poster =  res.data.results[0].backdrop_path
      dispatch({
        type: background,
        payload: poster
      })
    })
    .catch(err => console.log(err))
  }
};
