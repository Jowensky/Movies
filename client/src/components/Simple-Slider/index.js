import React from "react";
import Slider from "react-slick";
import './style.css'

class FilmSlider extends React.Component {
  render() {
    const settings = {
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      className: "slider row"
    };
    return (
      <Slider {...settings}>
        {this.props.children}
      </Slider>
    );
  }
}

export default FilmSlider;