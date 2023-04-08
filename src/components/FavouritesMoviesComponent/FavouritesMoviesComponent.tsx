import React from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Routes } from "../../constants/Routes";
import { deleteChekedMovie } from "../../store/reducers/favouriteSlice";
import { Close } from "@mui/icons-material";
import ImageWithOnError from "../ImageWithOnError.tsx/ImageWithOnError";
import { IMovie } from "../../interfaces/MovieInterfaces";

const FavouritesMoviesComponent = () => {
  const router = useHistory();
  const dispatch = useAppDispatch();
  const { favouriteMovies } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );
  return (
    <>
      {favouriteMovies.length ? (
        favouriteMovies.map((favouriteMovie: IMovie) => (
          <div className="favourites__movie-card" key={favouriteMovie.imdbID}>
            <div className="favourites__movie-block">
              <div
                onClick={(e) => {
                  router.push(`${Routes.MOVIE_INFO}/${favouriteMovie.imdbID}`);
                }}
              >
                <ImageWithOnError poster={favouriteMovie.Poster}></ImageWithOnError>
              </div>

              <h3 className="favourites__movie-title">{favouriteMovie.Title}</h3>
              <p className="favourites__movie-release">
                Type - {favouriteMovie.Type} ({favouriteMovie.Year})
              </p>
              <p className="favourites__movie-type"> </p>
              <div
                className="favourites__deleteFromFavourite"
                onClick={() => dispatch(deleteChekedMovie(favouriteMovie))}
              >
                <Close
                  sx={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: 20
                  }}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="favourites__nothing">Не найдено сохраненных фильмов</h1>
      )}
    </>
  );
};

export default FavouritesMoviesComponent;
