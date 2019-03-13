import axios from "axios";

export default {
  background: function() {
    return axios.get("//api.themoviedb.org/3/trending/movie/week?api_key=d3bd842cd067b7bd659924a258f4ce8d");
  },
  poster: function(find) {
    return axios.get("//api.themoviedb.org/3/search/movie?api_key=d3bd842cd067b7bd659924a258f4ce8d", {
      params: {
        query: find.query,
        year: find.year
      }
    });
  },
  movieTitle: function() {
    return axios.get("//api.themoviedb.org/3/search/movie?api_key=d3bd842cd067b7bd659924a258f4ce8d");
  },
  youtube: function(options) {
    return axios.get("https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: options.part,
        key: options.key,
        maxResults: options.maxResults,
        q: options.q,
        order: options.order
      }
    });
  },
  omdb: function(data) {
    return axios.get("//omdbapi.com/?apikey=a9f6407&t=" + data);
  }
};