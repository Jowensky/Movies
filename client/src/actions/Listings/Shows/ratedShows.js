import { listing } from "../../types";
import axios from "axios";

const TopRatedShowListings = () => {
    return function(dispatch) {
      axios.get("//api.themoviedb.org/3/tv/top_rated?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1")
      .then(res => {
        let lists = (res.data.results.slice(0, 12))
        let media = [{PageTitle: "Top Rated Shows"}]
        lists.forEach(list => {
          let obj = {
            type: "show",
            title: list.original_name,
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

export default TopRatedShowListings;