import React from "react";
import Slider from "react-slick";
import './style.css'

class FilmSlider extends React.Component {
  render() {
    var settings = {
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      className: "slider"
    };
    return (
      <Slider {...settings}>
        {this.props.children}
      </Slider>
    );
  }
}

export default FilmSlider;