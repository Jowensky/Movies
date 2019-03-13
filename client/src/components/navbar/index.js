import React from "react";

export function Navbar(props) {
  return (
    <div className="nav-bar fixed">
      <nav>
        <div className="nav-wrapper black">
          <form autoComplete="off" className="input-field" onSubmit={event => props.search(event)}>
            {props.children}
          </form>
        </div>
      </nav>
    </div>
  );
}


export function Input(props) {
  return <input id="artist" type="search" {...props} />
}

export function Label() {
  return (
      <i className="material-icons" id="submit">search</i>
  );
}
