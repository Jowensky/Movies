import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Listings, Media } from '../components/Listings'
import { NavBar, Input } from '../components/Nav'
import OnDisplay from '../actions/On-Display';
import SearchFilm from '../actions/Search/movie';
import SearchShow from '../actions/Search/show';
import TopRatedShowListings from '../actions/Listings/Shows/ratedShows';
import PopShowListings from '../actions/Listings/Shows/popShows';
import TopRatedFilmListings from '../actions/Listings/Movies/ratedMovies';
import PopMovieListings from '../actions/Listings/Movies/popMovies';

class Favorites extends Component {
  state = {
    films: 'Films',
    shows: 'Shows',
    search: ""
  };

  /* ------------------ Handle Input Change ------------- */
  handleInputChange = event => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  
  /* ---------------------- Display -----------------------*/
  displayMovie = event => {
    const chosen = this.props.movies.find(({ title }) => title === event); 
    
    this.props.OnDisplay(chosen)
  }

  displayShow = event => {
    const chosen = this.props.shows.find(({ title }) => title === event); 
    
    this.props.OnDisplay(chosen)
  }


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
  }
  
 
  render() {
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
          <Listings
           title="Movies"
          >
            {this.props.movies.map((media) => (
              <NavLink  to="/display"> 
                <Media 
                poster={media.poster}
                title={media.title}
                fullDisplay={this.displayMovie}
                />
              </NavLink>
            ))}
          </Listings>
        ) : (<div/>)}
        {this.props.shows.length ? (
          <Listings
            title="Shows"
          >
            {this.props.shows.map((media) => (
              media.poster ? (
              <NavLink  to="/display"> 
                <Media 
                poster={media.poster}
                title={media.title}
                fullDisplay={this.displayShow}
                />
              </NavLink>
              ) : (<div></div>)
            ))}
          </Listings>
        ) : (<div/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.MovieSearch.movies,
  shows: state.ShowSearch.shows
});

export default connect(mapStateToProps, { OnDisplay, SearchFilm, 
  SearchShow, TopRatedShowListings, PopShowListings,
  TopRatedFilmListings, PopMovieListings } )(Favorites);