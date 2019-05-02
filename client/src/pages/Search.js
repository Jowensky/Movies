import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Listings, Media } from '../components/Listings'
import { NavBar, Input } from '../components/Nav'
import OnDisplay from '../actions/On-Display';
import SearchFilm from '../actions/Search/movie'
import SearchShow from '../actions/Search/show'
import Listing from '../actions/Listings'

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
    this.props.Listing(obj)
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

export default connect(mapStateToProps, { OnDisplay, SearchFilm, SearchShow, Listing } )(Favorites);