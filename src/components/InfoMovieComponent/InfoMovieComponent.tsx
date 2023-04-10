import React from "react";

import "./style.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  addToFavourites,
  deleteChekedMovie,
} from "../../store/reducers/favouriteSlice";
import ImageWithOnError from "../ImageWithOnError.tsx/ImageWithOnError";
import ButtonForFavourites from "../ButtonsForFavourites/ButtonForFavourites";

const InfoMovieComponent = () => {
  const { movie } = useAppSelector((state) => state.movieInfoReducer);
  console.log(movie);
  return (
    <>
      {movie.map((item) => (
        <div className="movieInfo__wrapper" key={item.imdbID}>
          <div className="movieInfo__col-2">
            <ImageWithOnError poster={item.Poster}></ImageWithOnError>
          </div>
          <div className="movieInfo__col-3">
            <h2 className="movieInfo__title">{item.Title}</h2>
            <div className="movieInfo__subtitleInfo">
              <p className="movieInfo__released">{item.Released}</p>
              <p className="movieInfo__type">Type - ({item.Type})</p>
              <p className="movieInfo__runtime">{item.Runtime}</p>
            </div>
            <p className="movieInfo__genre">{item.Genre}</p>
            <p className="movieInfo__director">{item.Director}</p>
            <p className="movieInfo__writer">{item.Writer}</p>
            <p className="movieInfo__actors">{item.Actors}</p>
            <p className="movieInfo__plot">{item.Plot}</p>
            <p className="movieInfo__language">{item.Language}</p>
            <p className="movieInfo__country">{item.Country}</p>
            <p className="movieInfo__awards">{item.Awards}</p>
            <p className="movieInfo__rating">{item.imdbRating}</p>
            <p className="movieInfo__votes">{item.imdbVotes}</p>
            <div className="movieInfo__btn">
              <ButtonForFavourites movie={item}></ButtonForFavourites>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default InfoMovieComponent;
