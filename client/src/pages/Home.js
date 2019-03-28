import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { NowPlaying, NowPlayingMedia } from '../components/Now-Playing';
import { NavBar, Input } from '../components/Nav'
import { Banner, Movies } from '../components/Sliding-Banner'
import OnDisplay from '../actions/On-Display';
import Listings from '../actions/Listings'
import SearchFilm from '../actions/Search/movie'
import SearchShow from '../actions/Search/show'
import MoviesPlaying from '../actions/Now-Playing/movies';
import ShowsPlaying from '../actions/Now-Playing/shows';
import FilmsBanner from '../actions/Banner';

class Home extends Component {
  state = {
    reviews: -1,
    search: "",
    tosearch: false
  };


  /* ---------------- Component Life-Cycle -------------*/
  componentDidMount() {
    this.props.FilmsBanner();
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
        {this.props.moviesBanner.length ? (
        <Banner>
        {this.props.moviesBanner.map((movie, index) => (
          <Movies 
            poster={movie.poster}
            title={movie.title}
          />
        ))}
        <div>
          <img src={`https://image.tmdb.org/t/p/original${this.props.moviesBanner[0].poster}`} alt="movie poster"/>
          <h1>{this.props.moviesBanner[0].title}</h1>
        </div> 
        </Banner>
        ) : (<h1></h1>)} 
        {this.props.movies.length ? (
        <NowPlaying>
        {this.props.movies.map((film, index) => (
          <NavLink  to="/display"> 
            <NowPlayingMedia 
              poster={film.backdrop}
              title={film.title}
              subject={"Movie"}
              index={index}
              chosen={this.movieChosen}
            />
          </NavLink>
          ))}    
        </NowPlaying>
        ) : (<div/>)}
        <img className="tvShowBanner" src={"https://image.tmdb.org/t/p/original/sAzw6I1G9JUxm86KokIDdQeWtaq.jpg"} alt="T.V." />
        {this.props.shows.length ? (
        <NowPlaying>
        {this.props.shows.map((show, index) => (
        <NavLink  to="/display"> 
          <NowPlayingMedia 
            poster={show.backdrop}
            title={show.title}
            subject={"Tv Show"}
            index={index}
            chosen={this.showChosen}
          />
        </NavLink>
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
  moviesBanner: state.FilmsBannerReducer.films
});

export default connect(mapStateToProps, { OnDisplay, Listings, SearchFilm, SearchShow, MoviesPlaying, ShowsPlaying, FilmsBanner } )(Home);