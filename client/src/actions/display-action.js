import { selected, trailer, related, cast } from "./types";
import axios from "axios";

export const OnDisplay = chosen => dispatch => {
  dispatch({
    type: selected,
    payload: chosen
  })
}

export function TrailerAction(data) {
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
  }
}

export function RelatedAction(data) {
  const url = data.stream === 'show' ? 
  `https://api.themoviedb.org/3/tv/${data.id}/similar?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1` :
  `//api.themoviedb.org/3/movie/${data.id}/similar?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1`
  return function(dispatch) {
  axios
    .get(url)
    .then((res) => {
      let data = res.data.results.slice(0, 9)
      let similar = []
      data.forEach(media => {
        let obj = {
          backdrop: media.backdrop_path,
          poster: media.poster_path,
          title: media.stream === "show" ? media.original_name : media.original_title,
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

export function CastMembersAction(data) {
  const url = data.stream === 'show' ?
  `https://api.themoviedb.org/3/tv/${data.id}/credits?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US` :
  `//api.themoviedb.org/3/movie/${data.id}/credits?api_key=d3bd842cd067b7bd659924a258f4ce8d`
  return function(dispatch) {
  axios
    .get(url)
    .then((res) => {
      let data = (res.data.cast.slice(0, 6))
      let castMembers = []
      data.forEach(castMember => {
        let obj = {
          character: castMember.character,
          name: castMember.name,
          photo: castMember.profile_path
        }
        castMembers.push(obj)
    })
      dispatch({
        type: cast,
        payload: castMembers
      })
    })
  }
}
