import { trailer } from "../types";
import axios from "axios";

const TrailerAction = data => {
    const url = data.stream === 'show' ?
     `//api.themoviedb.org/3/tv/${data.id}/videos?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US` :
     `https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US`
    return function(dispatch) {
      axios.get(url)
      .then(res => {
        const uTubeTrailer = res.data.results[0].key
        dispatch({
          type: trailer,
          payload: uTubeTrailer
        })
      })
      .catch(err => console.log(err))
    }
}

export default TrailerAction;