import React from "react";
import { NavLink } from "react-router-dom";
import './style.css'

export function NowPlaying(props) {
  return <div className="home-container">{props.children}</div>
}

export function NowPlayingParallax(props) {
  return (
    <section style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${props.poster})`}}>
      <div id="description">
        <h2 className={props.title === "フェアリーテイル" ? "tooLarge" : null}>{props.title}</h2>
        <p className="overview">{props.overview}</p>
        <p className="trailer" onClick={() => props.chosen(props.title)}>
          <NavLink  to="/display"><i className="fab fa-youtube"></i></NavLink>
        </p>
      </div>
    </section>
  )
}