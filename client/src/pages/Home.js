import React, { Component } from "react";
import API from "../utils/api";
import Movieinfo from "../components/movieInfo"
import Container from "../components/container";
import Header from "../components/header";
import {Label, Input, Navbar} from "../components/navbar";
require("dotenv").config();

class Home extends Component {
  state = {
    movie: "",
    director: "",
    rated: "",
    plot: "",
    runtime: "",
    genre: "",
    youtube: ""
  };

  componentDidMount() {
    this.background();
  }

  background = () => {
    API.background()
      .then(res => document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.data.results[0].backdrop_path})`)
      .catch(err => console.log(err));
  };

  poster = (search) => {
    this.setState({ movie: ""})
    const find = {
      query: search.data.Title,
      year: search.data.Year,
    }

    API.poster(find)
      .then(res => document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.data.results[0].backdrop_path})`)
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  movieInfo = () => {
    document.getElementById('info').style.display = 'block'

    API.omdb(this.state.movie)
    .then((res) => {
      this.setState({
        director: res.data.Director,
        rated: res.data.Rated,
        plot: res.data.Plot,
        runtime: res.data.Runtime,
        genre: res.data.Genre
      })
      console.log(this.state.runtime)
      this.getVideo(res)
     })
    .catch(err => console.log(err))
  };

  getVideo = res => {
    const search = `${this.state.director} ${res.data.Title} movie trailer ${res.data.Year}`
    this.poster(res)
    const options = {
      part: "snippet",
      maxResults: 1,
      key: "AIzaSyC7PXhSNVVsm-fxia2x6uiluvBZe0p9Y2M",
      q: search,
      order: "viewCount"
    };

    API.youtube(options)
    .then(res => this.placeVidInHtml(res.data.items[0].id.videoId))
    .catch((err) => {
      this.setState({ youtube: "" })
      console.log(err)
    })
  }

  placeVidInHtml = id => {
    this.setState({ youtube: `https://www.youtube.com/embed/${id}` })
  };

  render() {
    return (
      <div>
        <Navbar>
        <Input
          value={this.state.movie}
          onChange={this.handleInputChange}
          name="movie"
          />
        <Label 
          search={this.movieInfo}
        />
        </Navbar>
        <Container>
          <Header />
          <Movieinfo 
            youtube={this.state.youtube}
            rated={this.state.rated === "UNRATED"  || this.state.rated === "N/A" || !this.state.rated ? '' : `${this.state.rated} | `}
            plot={this.state.plot}
            runtime={this.state.runtime === "UNRATED"  || this.state.runtime === "N/A" || !this.state.runtime ? '' : `${this.state.runtime} | `}
            genre={this.state.genre === "UNRATED"  || this.state.genre === "N/A" || !this.state.genre ? '' : this.state.genre}
            director={this.state.director === "N/A" ? '' : this.state.director}
          />
        </Container>
      </div>
    );
  }
}

export default Home;