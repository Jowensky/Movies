import React from "react";

const header = props => {
  return (
    <div className="row">
      <div className="col s12 center">
        <div id="lookitup">Movie Trailers</div>
        <div id="error">{props.error}</div>
      </div>
    </div>
  );
};

export default header;