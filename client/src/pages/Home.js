import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { NowPlayingParallax, NowPlaying } from '../components/Now-Playing';
import { NavBar, Input } from '../components/Nav'
import OnDisplay from '../actions/On-Display';
import SearchFilm from '../actions/Search/movie'
import SearchShow from '../actions/Search/show'
import MoviesPlaying from '../actions/Now-Playing/movies';
import ShowsPlaying from '../actions/Now-Playing/shows';
import TopRatedShowListings from '../actions/Listings/Shows/ratedShows';
import PopShowListings from '../actions/Listings/Shows/popShows';
import TopRatedFilmListings from '../actions/Listings/Movies/ratedMovies';
import PopMovieListings from '../actions/Listings/Movies/popMovies';


class Home extends Component {
  state = {
    reviews: -1,
    search: "",
    tosearch: false,
    icon: "fa-search"
  };


  /* ---------------- Component Life-Cycle -------------*/
  componentDidMount() {
    this.props.MoviesPlaying()
    this.props.ShowsPlaying();
  }


  /* ------------------ Handle Input Change ------------- */
  handleInputChange = event => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  
  /* ------------ Top Rated & Most Popular ------------ */
  list = data => {
    switch(data) {
      case 'popShows':
        this.props.PopShowListings()
      break;
      case 'popFilm':
        this.props.PopMovieListings()
      break;
      case 'topRatedShows': 
        this.props.TopRatedShowListings()
      break;
      case 'topRatedFilms':
        this.props.TopRatedFilmListings()
      break;
      default:
      break;
    }
  }


  /* ----------------- Search -------------------*/
  search = event => {
    event.preventDefault();
    this.props.SearchFilm(this.state.search)
    this.props.SearchShow(this.state.search)
    this.setState({tosearch: true})
  }

 
  /* --------------- Chossen Film --------------------*/
  movieChosen = event => {
    const choosenFilm = this.props.movies.find(({ title }) => title === event);
    this.props.OnDisplay(choosenFilm)
  }

  showChosen = event => {
    const choosenShow = this.props.shows.find(({ title }) => title === event);

    this.props.OnDisplay(choosenShow)
  }

  shorten = overview => {
    if (overview) {
      return `${overview.substr(0, 150)}..`;
    } else {
      return ``;
    }
  };

  searchIcon = () => {
    const input = document.getElementById("input").style

    if (input.display === "none") {
    input.display = "block"
    this.setState({icon: "fa-times"})
    } else {
      input.display = "none"
      this.setState({icon: "fa-search"})
    }
  }
 

  render() {
    if (this.state.tosearch === true) {
      return <Redirect to='/search' />
    }
    return (
      <div>
        <NavBar
        list={this.list}
        search={this.search}
        searchIcon={this.searchIcon}
        icon={this.state.icon}
        >
        <Input 
        value={this.state.search}
        onChange={this.handleInputChange}
        name="search"
        />
        </NavBar>
        {this.props.movies.length ? (
        <NowPlaying>
        {this.props.movies.map((film) => (
          <NowPlayingParallax 
            poster={film.backdrop}
            title={film.title}
            chosen={this.movieChosen}
            overview={this.shorten(film.overview)}
          />
        ))}    
        </NowPlaying>
        ) : (<div/>)}
        {this.props.shows.length ? (
        <NowPlaying>
        {this.props.shows.map((show) => (
          <NowPlayingParallax 
            poster={show.backdrop}
            title={show.title}
            chosen={this.showChosen}
            overview={this.shorten(show.overview)}
          />
        ))}    
        </NowPlaying>
        ) : (<div/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shows: state.ShowsPlayingReducer.shows,
  movies: state.MoviesPlayingReducer.movies,
});

export default connect(mapStateToProps, { OnDisplay, SearchFilm, 
  SearchShow, MoviesPlaying, ShowsPlaying, 
  TopRatedShowListings, PopShowListings,
  TopRatedFilmListings, PopMovieListings} )(Home);