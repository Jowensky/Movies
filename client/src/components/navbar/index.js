import React from "react";

export function Navbar(props) {
  return (
    <div className="nav-bar fixed">
      <nav>
        <div className="nav-wrapper black">
          <form>
            <div className="input-field">{props.children}</div>
          </form>
        </div>
      </nav>
    </div>
  );
}

export function Input(props) {
  return (
    <form autoComplete="off" onSubmit={event => props.search(event)}>
      <input id="artist" type="search" {...props} />
    </form>
  );
}

export function Label(props) {
  return (
      <i className="material-icons" id="submit">search</i>
  );
}
