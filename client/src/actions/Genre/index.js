import { genre } from "../types";
import GetGenre from './getGenre';
import axios from "axios";

const GenreAction =  (data) => {
    return function(dispatch) {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US")
      .then(async function(res) {
        
        console.log(data)

        const mediaGenre = await GetGenre(res, data)

        dispatch({
          type: genre,
          payload: mediaGenre
        })
      })
    }
}

export default GenreAction;