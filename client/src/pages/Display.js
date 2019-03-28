import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Related from '../components/Display';
import FilmSlider from '../components/Simple-Slider';
import { Selected, Options, Trailer, Casts} from '../components/Selected-Film'
import CastMembersAction from '../actions/Cast-Members';
import RelatedAction from '../actions/Related';
import TrailerAction from '../actions/Trailer';
import OnDisplay from '../actions/On-Display';

class Movie extends Component {
  state = {
    youtube: -1,
    id: ''
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
    }

    this.setState({id: props.selected.id})

    const video = "https://www.youtube.com/embed/" + props.trailer
    this.setState({ youtube: video})
  }


  /* ------------------ Handle Input Change ------------- */
  handleInputChange = event => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  /* --------------- Toggle --------------------*/
  mediaInfo = event => {
    switch(event) {
      case 'cast':
      this.toggle('cast')
      break;
      case 'trailer':
      this.toggle('selectedVideo')
      break;
      case 'related':
      this.toggle('related')
      break;
      default: 
      break;
    }
  }

  toggle = id => {
    const element = document.getElementById(id)
    if (element.style.display === "block") {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  };

  display = event => {
    const chosen = this.props.related.find(({ title }) => title === event)

    this.props.OnDisplay(chosen)
  }
 

  render() {
    return (
      <div>
         <Options 
         info = {this.mediaInfo}
         />
         {this.props.selected.title ? (
        <Selected 
         backdrop = {this.props.selected.backdrop}
         poster = {this.props.selected.poster}
         title = {this.props.selected.title}
         overview = {this.props.selected.overview}
         rating = {this.props.selected.vote}
         >
         {this.props.casts.map(castMember => (
         <Casts 
          photo = {castMember.photo}
          character = {castMember.character}
          name = {castMember.name}
         />
         ))}
         </Selected>
         ) : (<div/>)}
         <Trailer 
         video = {this.state.youtube}
         />
         <div id="related">
          <FilmSlider>
          <NavLink  to="/display"> 
            {this.props.related.map(relative => (
            <Related 
              poster = {relative.poster}
              title = {relative.title}
              display = {this.display}
              />
              ))}
              </NavLink>
            </FilmSlider>
          </div>
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

export default connect(mapStateToProps, {CastMembersAction, RelatedAction, TrailerAction, OnDisplay} )(Movie);