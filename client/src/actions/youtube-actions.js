import { video } from "./types";
import axios from "axios";

        /// movie search from client /// 
export const getVideo = search => dispatch => {
  axios
    .get("https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      maxResults: 1,
      key: "AIzaSyC7PXhSNVVsm-fxia2x6uiluvBZe0p9Y2M",
      q: search,
      order: "viewCount"
    }})
    .then((res) => {
      dispatch({
        type: video,
        payload: res.data.items[0].id.videoId
      })
    })
    .catch(err => console.log(err))
};

export default getVideo;