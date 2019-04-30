import React from "react";
import './style.css'
import blankHead from './images/blankhead.png';

export function Selected(props) {
    return (
        <div>
            <img id="selectedBackDrop" src={`https://image.tmdb.org/t/p/original${props.backdrop}`} alt="Poster" />
            <div className="container">
                <div className="row" id="film">
                    <div className="selectedPosterDiv col-md-6 order 5">
                        <img id="selectedPoster" src={`https://image.tmdb.org/t/p/original${props.poster}`} alt={props.title}/>
                    </div>
                    <div className="col-md-6 order3" id="details">
                        <div className="selectedDesciption displayGroup">
                            <h1>{props.title}</h1>
                        <div className="row justify-content-around">
                            <p><i class="fas fa-star starRating"></i><span className="rating">{props.rating}</span></p>
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
                <p className="character">{props.character}</p>
                <p className="performer">{props.name}</p>
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
        <div className="row justify-content-center">
            <div>
                <iframe id="trailer" 
                    src={props.video} title="video" frameBorder="0" 
                    allow="autoplay; encrypted-media" allowFullScreen>
                </iframe>
            </div>
        </div>
    )
}