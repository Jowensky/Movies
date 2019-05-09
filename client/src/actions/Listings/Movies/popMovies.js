import { listing } from "../../types";
import axios from "axios";

const PopMovieListings = () => {
    return function(dispatch) {
      axios.get("//api.themoviedb.org/3/movie/popular?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=2")
      .then(res => {
        let lists = (res.data.results.slice(0, 12))
        let media = [{PageTitle: "Popular Films"}]
        lists.forEach(list => {
          let obj = {
            type: "movie",
            title: list.original_title,
            poster: list.poster_path,
            backdrop: list.backdrop_path,
            overview: list.overview,
            vote: list.vote_average,
            id: list.id
          }
          media.push(obj)
        })
        dispatch({
          type: listing,
          payload: media
        })
      })
    }
}

export default PopMovieListings;