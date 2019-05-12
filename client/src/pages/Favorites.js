import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { NavBar, Input } from '../components/Nav'
import { Listings, Media } from '../components/Listings'
import OnDisplay from '../actions/On-Display';
import SearchFilm from '../actions/Search/movie';
import SearchShow from '../actions/Search/show';
import TopRatedShowListings from '../actions/Listings/Shows/ratedShows';
import PopShowListings from '../actions/Listings/Shows/popShows';
import TopRatedFilmListings from '../actions/Listings/Movies/ratedMovies';
import PopMovieListings from '../actions/Listings/Movies/popMovies';

class Favorites extends Component {
  state = {
    title: '',
    search: "",
    tosearch: false,
    icon: "fa-search"
  };

  componentWillReceiveProps(props) {
    const page = props.medium.shift();
    if (props.medium.length) {
      this.setState({title: Object.values(page).toString()})
    }
  }


  /* ------------------ Handle Input Change ------------- */
  handleInputChange = event => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  /*-----------------------  Display  ----------------------*/
  displayFav = event => {
    const chosen = this.props.medium.find(({ title }) => title === event); 
    
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
    this.setState({tosearch: true})
  }

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
        {this.props.medium.length ? (
          <Listings
            title={this.state.title}
          >
            {this.props.medium.map((media) => (
              <NavLink  to="/display"> 
                <Media 
                poster={media.poster}
                title={media.title}
                fullDisplay={this.displayFav}
                />
              </NavLink>
            ))}
          </Listings>
        ) : (<div/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  medium: state.Listings.list
});

export default connect(mapStateToProps, { OnDisplay, SearchFilm, 
  SearchShow, TopRatedShowListings, PopShowListings,
  TopRatedFilmListings, PopMovieListings } )(Favorites);