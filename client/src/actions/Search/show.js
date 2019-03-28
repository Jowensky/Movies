import { showSearch } from "../types";
import axios from "axios";

const SearchShow = data => {
    return function(dispatch) {
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&query=${data}&page=1&include_adult=false`)
      .then(res => {
        let retrival = res.data.results.slice(0, 10)
        let search = []
        retrival.forEach(show => {
          let obj = {
            backdrop: show.backdrop_path,
            poster: show.poster_path,
            title: show.original_name,
            overview: show.overview,
            vote: show.vote_average,
            id: show.id
          }
          search.push(obj)
        })
        dispatch({
          type: showSearch,
          payload: search
        })
      })
      .catch(err => console.log(err))
    }
}

export default SearchShow;