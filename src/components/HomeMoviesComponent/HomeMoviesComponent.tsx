import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useHistory } from "react-router-dom";
import {
  addToFavourites,
  deleteChekedMovie,
} from "../../store/reducers/favouriteSlice";
import { DeleteOutline, FavoriteBorder } from "@mui/icons-material";
import "./style.css";
import { Routes } from "../../constants/Routes";
import ImageWithOnError from "../ImageWithOnError.tsx/ImageWithOnError";
import ButtonForFavourites from "../ButtonsForFavourites/ButtonForFavourites";

const HomeMoviesComponent = () => {
  const router = useHistory();
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movieReducer);
  const { favouriteMovie } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );

  return (
    <>
      {!!movies.length &&
        movies.map((movie) => (
          <div className="main__movie-card" key={movie.imdbID}>
            <div className="main__movie-block">
              <div
                onClick={(e) => {
                  router.push(`${Routes.MOVIE_INFO}/${movie.imdbID}`);
                }}
              >
                <ImageWithOnError poster={movie.Poster}></ImageWithOnError>
              </div>
              <h3 className="main__movie-title">{movie.Title}</h3>
              <p className="main__movie-release">
                Type - {movie.Type} ({movie.Year})
              </p>
              <p className="main__movie-type"> </p>
              <div className="main__saveToFavourite">
                <ButtonForFavourites movie={movie}></ButtonForFavourites>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default HomeMoviesComponent;
