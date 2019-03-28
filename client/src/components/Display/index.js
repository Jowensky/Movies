import React from "react";
import './style.css';

const RelatedFilms = props => {
    return (
        <div onClick={() => props.display(props.title)}className="contain">
            <img id="movieDisplay" src={`https://image.tmdb.org/t/p/original${props.poster}`} alt={props.poster} />
        </div>
    )
}

export default RelatedFilms;