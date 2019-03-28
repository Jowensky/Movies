import React from "react";
import './style.css'

export function Selected(props) {
    return (
        <div>
            <img id="selectedBackDrop" src={`https://image.tmdb.org/t/p/original${props.backdrop}`} alt="Poster" />
            <div className="container">
                <div className="row" id="film">
                    <div className="selectedPosterDiv col-md-6 order 5">
                        <img id="selectedPoster" src={`https://image.tmdb.org/t/p/original${props.poster}`}/>
                    </div>
                    <div className="selectedDesciption col-md-6 order3">
                        <h1>{props.title}</h1>
                        <p>{props.overview}</p>
                        <p>{props.genre}</p>
                        <p>{props.rating}</p>
                    </div>
                    <div id="cast" className="col-md-6 order3 cast">
                    {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Casts(props) {
    return (
      <div>
        <img src={`https://image.tmdb.org/t/p/original${props.photo}`} alt={props.name} />
        <p className="character">{props.character}</p>
        <p className="name">{props.name}</p>
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

export function Trailer(props) {
    return (
        <iframe id="selectedVideo"  
            src={props.video} title="video" frameBorder="0" 
            allow="autoplay; encrypted-media" allowFullScreen>
        </iframe>
    )
}