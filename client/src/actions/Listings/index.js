import { listing } from "../types";
import axios from "axios";

const Listings = data => {
    return function(dispatch) {
      axios.get(data.url)
      .then(res => {
        let lists = (res.data.results.slice(0, 12))
        let media = [{PageTitle: data.title}]
        lists.forEach(list => {
          let obj = {
            type: data.stream,
            title: data.stream === "show" ? list.original_name : list.original_title,
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
      .catch(err => console.log(err))
    }
}

export default Listings;