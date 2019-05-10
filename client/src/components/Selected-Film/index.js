import React from "react";
import './style.css'
import blankHead from './images/blankhead.png';

export function Selected(props) {
    return (
        <div>
            <img id="selectedBackDrop" src={`https://image.tmdb.org/t/p/original${props.backdrop}`} alt="Poster" />
            <div className="container">
                <div className="row text-center" id="film">
                    <div className="selectedPosterDiv col-lg-6 col-md-12 order2">
                        <img id="selectedPoster" src={`https://image.tmdb.org/t/p/original${props.poster}`} alt={props.title}/>
                    </div>
                    <div className="col-lg-6 col-md-12 order1" id="details">
                        <div className="selectedDesciption displayGroup">
                            <h1>{props.title}</h1>
                        <div className="row justify-content-around">
                            {/* <p><i className="fas fa-star starRating"></i><span className="rating">{props.rating}</span></p> */}
                            <p>{props.genre}</p>
                            <p id="director">{props.director}</p>
                        </div>
                            <p id="overview">{props.overview}</p>
                        </div>
                        <div id="cast">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Casts(props) {
    return (
        <div className="castMember">
            <img src={props.photo === null ? blankHead : `https://image.tmdb.org/t/p/original${props.photo}`} alt={props.name} />
            <div className="name">
                <p id="performer">{props.name}</p>
                <p id="character">Character: {props.character}</p>
            </div>
        </div>
    );
}

export function Options(props) {
    return (
        <div className="options">
            <ul className="d-flex justify-content-around">
                <li onClick={() => props.info('cast')}>Cast</li>
                <li onClick={() => props.info('trailer')}>Trailer</li>
                <li onClick={() => props.info('related')}>Related</li>
            </ul>
        </div>
    )
}

export function MovieTrailer(props) {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-12 text-center center">
                    <iframe id="trailer" 
                        src={props.video} title="video" frameBorder="0" 
                        allow="autoplay; encrypted-media" allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
    )
}