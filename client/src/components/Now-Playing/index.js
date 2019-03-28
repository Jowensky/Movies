import React from "react";
import './style.css'

export function NowPlaying(props) {
  return (
    <div className="nowPlaying container">
      <h1 className="subject">Now Playing</h1>
      <div>
      {props.children}
      </div>
    </div>
  )
}

export function NowPlayingMedia(props) {
  return (
    <div className="nowPlayingPoster row">
      <img onClick={() => props.chosen(props.title)} className={`nowPlayingFilm${props.index} 
      ${props.index === 0 ? "col-md-7 order-0" 
      : props.index === 1 ? "col-md-7 order-1" 
      : props.index === 2 ? "col-md-7 order-0" 
      : ""}`} src={`https://image.tmdb.org/t/p/original${props.poster}`} alt='film' 
      />
      <div onClick={() => props.chosen(props.title)} className={`nowPlayingTitle${props.index}
      ${props.index === 0 ? "col-md-5 order-1 text-left" 
      : props.index === 1 ? "col-md-5 order-0 text-right"
      : props.index === 2 ? "col-md-5 order-1 text-left" 
      : ""}`}>
        <h2>{props.subject}</h2>
        <h1 >{props.title}</h1>
        <p>{props.review}</p>
      </div>
    </div>
  )
}