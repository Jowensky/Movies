import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {RelatedFilms, RelatedContainer} from '../components/Display';
import FilmSlider from '../components/Simple-Slider';
import { NavBar, Input } from '../components/Nav'
import { Selected, MovieTrailer, Casts} from '../components/Selected-Film'
import CastMembersAction from '../actions/Cast-Members';
import RelatedAction from '../actions/Related';
import TrailerAction from '../actions/Trailer';
import OnDisplay from '../actions/On-Display';
import SearchFilm from '../actions/Search/movie'
import SearchShow from '../actions/Search/show'
import TopRatedShowListings from '../actions/Listings/Shows/ratedShows';
import PopShowListings from '../actions/Listings/Shows/popShows';
import TopRatedFilmListings from '../actions/Listings/Movies/ratedMovies';
import PopMovieListings from '../actions/Listings/Movies/popMovies';

class Movie extends Component {
  state = {
    youtube: -1,
    search: "",
    id: '',
    tosearch: false,
    director: "",
    icon: "fa-search",
    casts: -1
  };
  

  /* ---------------- Component Life-Cycle -------------*/
  componentDidMount() {
    this.setState({id: this.props.selected.id})
    this.props.CastMembersAction({id: this.props.selected.id, stream: this.props.selected.type})
    this.props.RelatedAction({id: this.props.selected.id, stream: this.props.selected.type})
    this.props.TrailerAction({id: this.props.selected.id, stream: this.props.selected.type})
  }

  componentWillReceiveProps(props) {
    if (props.casts.length) {
      const direc = props.casts.filter(director => director.job === "Director")
      const notdirec = props.casts.filter(director => director.job !== "Director")
      this.setState({director: direc[0].persons})
      this.setState({casts: notdirec})
    }

    if (this.state.id !== props.selected.id) {
      this.props.TrailerAction({id: props.selected.id, stream: props.selected.type})
      this.props.RelatedAction({id: props.selected.id, stream: props.selected.type})
      this.props.CastMembersAction({id: props.selected.id, stream: props.selected.type})
      this.setState({id: props.selected.id})
    }

    if (props.trailer) {
    const video = "https://www.youtube.com/embed/" + props.trailer
    this.setState({ youtube: video})
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

  display = event => {
    const chosen = this.props.related.find(({ title }) => title === event); 
    
    this.props.OnDisplay(chosen)
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
         {this.props.selected.title ? (
        <Selected 
          backdrop = {this.props.selected.backdrop}
          poster = {this.props.selected.poster}
          title = {this.props.selected.title}
          overview = {this.props.selected.overview}
          rating = {this.props.selected.vote}
          director = {this.state.director}
         >
        {this.state.casts.length ? (
        <FilmSlider>
          {this.state.casts.map(castMember => (
            <Casts 
              photo = {castMember.photo}
              character = {castMember.character}
              name = {castMember.name}
            />
          ))}
        </FilmSlider>
        ) : (<div/>)}
        </Selected>
        ) : (<div/>)}
        {this.state.youtube === -1 ? false :
          <MovieTrailer 
            video = {this.state.youtube}
          />
        }
        {this.props.related.length ? (
        <RelatedContainer>
          {this.props.related.map(relative => (
            <div>
              <NavLink  to="/display"> 
                <RelatedFilms 
                  poster = {relative.poster}
                  title = {relative.title}
                  display = {this.display}
                />
              </NavLink>
            </div>
          ))}
        </RelatedContainer>
         ) : (<div/>) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.OnDisplay.selected,
  trailer: state.TrailerReducer.trailer,
  related: state.RelatedReducer.related,
  casts: state.CastMembersReducer.casts,
});

export default connect(mapStateToProps, {CastMembersAction, RelatedAction, 
  TrailerAction, OnDisplay, 
  SearchFilm, SearchShow, 
  TopRatedShowListings, PopShowListings,
  TopRatedFilmListings, PopMovieListings } )(Movie);