import React, { Component } from "react";
import Movieinfo from "../components/movieInfo"
import Container from "../components/container";
import Header from "../components/header";
import { Input, Navbar} from "../components/navbar";
import { Info, Poster } from '../actions/movie-actions';
import getVideo from "../actions/youtube-actions";
import { connect } from "react-redux";
import axios from "axios";

class Home extends Component {
  state = {
    movie: "",
    youtube: null
  };

  componentDidMount() {
    this.initialBackground();
  }

  initialBackground = () => {
    axios.get("//api.themoviedb.org/3/trending/movie/week?api_key=d3bd842cd067b7bd659924a258f4ce8d")
      .then(res => document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.data.results[0].backdrop_path})`)
      .catch(err => console.log(err));
  };

  handleInputChange = event => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  movieInfo = event => {
    event.preventDefault();

    document.getElementById('info').style.display = 'block'

    this.props.Info(this.state.movie);
    this.setState({
      movie: ""
    });
  }

  componentWillReceiveProps(props) {
    const videoSearch = `${props.info.director} ${props.info.title} movie trailer ${props.info.year}`
    const posterSearch = {
      query: props.info.title,
      year: props.info.year
    }

    this.props.getVideo(videoSearch);
    this.props.Poster(posterSearch);
    document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${props.background})`
    this.setState({ youtube: `https://www.youtube.com/embed/${props.video}` })
  }

  render() {
    return (
      <div>
        <Navbar
          search={this.movieInfo}
          >
        <Input
          value={this.state.movie}
          onChange={this.handleInputChange}
          name="movie"
          />
        </Navbar>
        <Container>
          <Header />
          <Movieinfo 
            youtube={this.state.youtube}
            genre={this.props.info.genre === "UNRATED"  || this.props.info.genre === "N/A" || !this.props.info.genre ? '' : `${this.props.info.genre}`}
            rated={this.props.info.rated === "UNRATED"  || this.props.info.rated === "N/A" || !this.props.info.rated ? '' : ` | ${this.props.info.rated} `}
            plot={this.props.info.plot}
            runtime={this.props.info.runtime === "UNRATED"  || this.props.info.runtime=== "N/A" || !this.props.info.runtime ? '' : `| ${this.props.info.runtime}`}
            director={this.props.info.director === "N/A" ? '' : this.props.info.director}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  info: state.movieInfo.imbd,
  video: state.youtube.item,
  background: state.background.poster
});

export default connect(mapStateToProps, { Info, getVideo, Poster } )(Home);
