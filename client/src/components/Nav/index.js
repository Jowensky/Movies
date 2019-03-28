import React from "react";
import './style.css'
import { NavLink } from "react-router-dom";

export function NavBar(props) {
  return (
    <div id="navbar">
      <a className="link" href="/home">Home</a>
      <a className="link" href="/hot">Hot</a>
      <NavLink  to="/favorites/popular-shows"> 
        <li onClick={() => props.list('popShows')}>Shows</li>
      </NavLink>
      <NavLink  to="/favorites/popular-film"> 
        <li onClick={() => props.list('popFilm')}>Film</li>
      </NavLink>
        <a className="link" href="/top20">Top 20</a>
      <NavLink  to="/favorites/top-rated-films-20"> 
        <li onClick={() => props.list('topRatedShows')}>Shows</li>
      </NavLink>
      <NavLink  to="/favorites/top-rated-shows-20"> 
        <li onClick={() => props.list('topRatedFilms')}>Film</li>
      </NavLink>
       <i className="fas fa-search"></i>
       <form onSubmit={(event) => props.search(event)}>
        {props.children}
        </form>
    </div>
  )
}

export function Input(props) {
  return <input type="text" {...props}/>
}