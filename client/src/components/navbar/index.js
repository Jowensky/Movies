import React from "react";

export function Navbar(props) {
  return (
    <div className="nav-bar fixed">
    <nav>
      <div className="nav-wrapper black">
        <form>
          <div className="input-field">
          {props.children}
          </div>
        </form>
      </div>
    </nav>
  </div>
  );
};

export function Input(props) {
  return (
  <input id="artist" type="search" {...props} />
  )
}

export function Label(props) {
  return (
  <label className="label-icon" id="right"><i className="material-icons" id="submit" onClick={() => props.search()}>search</i></label>
  )
}


