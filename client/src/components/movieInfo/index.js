import React from "react";

const Movieinfo = props => {
  return (
    <div className="row">
      <div className="col s12 center">
      {/* eslint-disable-next-line */}
      <iframe id="youtube" width='700' height='450' align='middle' src={props.youtube} frameBorder='0' allow='autoplay' encrypted-media="true" allowFullScreen></iframe>
        <div id="info">
          <div>{props.plot}</div>
          <div>{props.rated}{props.runtime}{props.genre}</div>
          <div>{props.director}</div>
        </div>
      </div>
    </div>
  );
};

export default Movieinfo;
