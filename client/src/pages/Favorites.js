import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Listings, Media } from '../components/Listings'
import OnDisplay from '../actions/On-Display';

class Favorites extends Component {
  state = {
    title: ''
  };

  componentWillReceiveProps(props) {
    if (props.medium.length) {
      const page = props.medium.shift();
      this.setState({title: Object.values(page).toString()})
      console.log(Object.values(page).toString())
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

  
  render() {
    return (
      <div>
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

export default connect(mapStateToProps, { OnDisplay } )(Favorites);