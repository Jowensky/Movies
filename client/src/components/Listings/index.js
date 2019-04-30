import React from "react";
import './style.css'

export function Listings(props) {
    return (
        <div className="container">
        <h1 id="group">{props.title}</h1>
            <div className="row justify-content-center">
                {props.children}
            </div>
        </div>
    )
}

export function Media(props) {
    return (
        <div onClick={() => props.fullDisplay(props.title)} className="favs">
            <img className="mediaPoster" src={`https://image.tmdb.org/t/p/original${props.poster}`} alt={props.poster} />
            <h2 className="mediaTitle">{props.title}</h2>
        </div>
    )
}