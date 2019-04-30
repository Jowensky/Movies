import React from "react";
import './style.css';

export function RelatedFilms(props) {
    return (
        <div onClick={() => props.display(props.title)} className="relatedFilm col-auto">
            <img src={`https://image.tmdb.org/t/p/original${props.poster}`} alt={props.poster} />
        </div>
    )
}

export function RelatedContainer(props) {
    return (
        <div className="row justify-content-center related">
        <div>
            <h1>Related Films</h1>
        </div>
            {props.children}
        </div>
    )
}