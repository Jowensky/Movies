import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Listings, Media } from '../components/Listings'
import OnDisplay from '../actions/On-Display';

class Favorites extends Component {
  state = {
    films: 'Films',
    shows: 'Shows'
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

 
  render() {
    return (
      <div>
        {this.props.movies.length ? (
          <Listings>
            <h1>Movies</h1>
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
          <Listings>
            <h1>Shows</h1>
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

export default connect(mapStateToProps, { OnDisplay } )(Favorites);