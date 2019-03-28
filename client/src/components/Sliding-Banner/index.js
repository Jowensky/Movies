import React from "react";
import './style.css'

export function Banner(props) {
  return (
    <div id="slider">
      <figure>
          {props.children}
      </figure>
    </div>
  );
};

export function Movies(props) {
    return (
        <div className={`movie`}>
            <img src={`https://image.tmdb.org/t/p/original${props.poster}`} alt="Film" />
            <h1 className={`title`}>{props.title}</h1>
        </div>
    )
}