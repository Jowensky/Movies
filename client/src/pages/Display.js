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
import Listing from '../actions/Listings'

class Movie extends Component {
  state = {
    youtube: -1,
    search: "",
    id: '',
    tosearch: false,
    director: ""
  };
  

  /* ---------------- Component Life-Cycle -------------*/
  componentDidMount() {
    this.setState({id: this.props.selected.id})
    this.props.CastMembersAction({id: this.props.selected.id, stream: this.props.selected.type})
    this.props.RelatedAction({id: this.props.selected.id, stream: this.props.selected.type})
    this.props.TrailerAction({id: this.props.selected.id, stream: this.props.selected.type})
  }

  componentWillReceiveProps(props) {
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
    this.setState({tosearch: true})
  }

  display = event => {
    const chosen = this.props.related.find(({ title }) => title === event); 
    
    this.props.OnDisplay(chosen)
  }

  inputToggle = () => {
    console.log("this")
    // document.getElementById("input").style.display = "show"
    // document.getElementById("searchIcon").style.display = "none"
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
          toggleInput={this.inputToggle}
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
          // director = {this.props.casts[0]}
         >
        <FilmSlider>
          {this.props.casts.map(castMember => (
          <Casts 
            photo = {castMember.photo}
            character = {castMember.character}
            name = {castMember.name}
          />
          ))}
        </FilmSlider>
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

export default connect(mapStateToProps, {CastMembersAction, RelatedAction, TrailerAction, OnDisplay, Listing, SearchFilm, SearchShow } )(Movie);