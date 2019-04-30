import { cast } from "../types";
import axios from "axios";

const CastMembersAction = data => {
    const url = data.stream === 'show' ?
    `https://api.themoviedb.org/3/tv/${data.id}/credits?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US` :
    `//api.themoviedb.org/3/movie/${data.id}/credits?api_key=d3bd842cd067b7bd659924a258f4ce8d`
    return function(dispatch) {
    axios
      .get(url)
      .then((res) => {
        let data = (res.data.cast.slice(0, 6))
        const director = res.data.crew.find( director => director.job === "Director" );
        let castMembers = []
        // castMembers.push(director.name)
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
      .catch(err => console.log(err))
    }
}

export default CastMembersAction;