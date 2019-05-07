import { related } from "../types";
import axios from "axios";

const RelatedAction = data => {
    const url = data.stream === "show" ? 
    `//api.themoviedb.org/3/tv/${data.id}/similar?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1` :
    `//api.themoviedb.org/3/movie/${data.id}/similar?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1`
    return function(dispatch) {
    axios
      .get(url)
      .then((res) => {
        let group = res.data.results.slice(0,4)
        let similar = []
        group.forEach(media => {
          let obj = {
            type: data.stream === "show" ? "show" : "movie",
            backdrop: media.backdrop_path,
            poster: media.poster_path,
            title: data.stream === "show" ? media.original_name : media.original_title,
            overview: media.overview,
            vote: media.vote_average,
            id: media.id
          }
          similar.push(obj)
      })
        dispatch({
          type: related,
          payload: similar
        })
      })
    }
}

export default RelatedAction;