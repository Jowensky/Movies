import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { NowPlayingParallax, NowPlaying } from '../components/Now-Playing';
import { NavBar, Input } from '../components/Nav'
import OnDisplay from '../actions/On-Display';
import Listings from '../actions/Listings'
import SearchFilm from '../actions/Search/movie'
import SearchShow from '../actions/Search/show'
import MoviesPlaying from '../actions/Now-Playing/movies';
import ShowsPlaying from '../actions/Now-Playing/shows';

class Home extends Component {
  state = {
    reviews: -1,
    search: "",
    tosearch: false
  };


  /* ---------------- Component Life-Cycle -------------*/
  componentDidMount() {
    // window.addEventListener("scroll", this.scrollEffect)
    this.props.MoviesPlaying()
    this.props.ShowsPlaying();
  }


  /* ------------------- Scroll Effect ------------------*/
  scrollEffect = () => {
    const target = document.querySelectorAll("#description")

    let index = 0, length = target.length;
    for (index; index < length; index++) {
       let pos = window.pageYOffset * -.2 /*target[index].dataset.rate */


       target[index].style.transform = `translate3d(0px, ${pos}px, 0px)`;
    }
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
    let obj = -1
    switch(data) {
      case 'popShows':
        obj = {
          title: 'Popular Shows',
          url: '//api.themoviedb.org/3/tv/popular?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1',
          stream: 'show'
        }
      break;
      case 'popFilm':
        obj = {
          title: 'Popular Film',
          url: '//api.themoviedb.org/3/movie/popular?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=2',
          stream: 'movie'
        }
      break;
      case 'topRatedShows': 
        obj = {
          title: 'Top Rated Shows',
          url: '//api.themoviedb.org/3/tv/top_rated?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1',
          stream: 'show'
        }
      break;
      case 'topRatedFilms':
        obj = {
          title: 'Top Rated Films',
          url: '//api.themoviedb.org/3/movie/top_rated?api_key=d3bd842cd067b7bd659924a258f4ce8d&language=en-US&page=1',
          stream: 'movie'
        }
      break;
      default:
      break;
    }
    this.props.Listings(obj)
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
 

  render() {
    if (this.state.tosearch === true) {
      return <Redirect to='/search' />
    }
    return (
      <div>
        <NavBar
        list={this.list}
        search={this.search}
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

export default connect(mapStateToProps, { OnDisplay, Listings, SearchFilm, SearchShow, MoviesPlaying, ShowsPlaying } )(Home);