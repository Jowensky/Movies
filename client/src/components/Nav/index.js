import React from "react";
import './style.css'
import { NavLink } from "react-router-dom";

export function NavBar(props) {
  return (
    <div id="navbar">
      <ul>
        <li><NavLink to="/"><span id="home">Home</span></NavLink></li>
        <li>Hot
          <ul>
            <li onClick={() => props.list('popShows')}> 
              <NavLink  to="/favorites/popular-shows">Shows</NavLink>
            </li>
            <li onClick={() => props.list('popFilm')}>
              <NavLink  to="/favorites/popular-film">Film</NavLink>
            </li>
          </ul>
        </li>
        <li>Top 20
          <ul>
            <li onClick={() => props.list('topRatedShows')}>
              <NavLink  to="/favorites/top-rated-shows-20">Shows</NavLink>
            </li>
            <li onClick={() => props.list('topRatedFilms')}>      
              <NavLink  to="/favorites/top-rated-films-20">Film</NavLink>
            </li>
          </ul>
        </li>
      </ul>
      <div className="searchInput">
        <form autoComplete="off" onSubmit={(event) => props.search(event)}>
        {props.children}
        </form>
      </div>
    </div>
  )
}

export function Input(props) {
  return <input id="input" type="text" placeholder="Search" {...props}/>
}