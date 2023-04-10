import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { deleteAllMovies } from "../../store/reducers/favouriteSlice";
import "./style.css";

import FavouritesMoviesComponent from "../../components/FavouritesMoviesComponent/FavouritesMoviesComponent";

const FavouritesPage = () => {
  const dispatch = useAppDispatch();
  const { favouriteMovies } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );
  return (
    <div className="favourites" style={{ paddingTop: "60px" }}>
      <div className="favourites__container">
        {!!favouriteMovies.length && (
          <button
            className="favourites__deleteAll"
            onClick={() => dispatch(deleteAllMovies())}
          >
            Delete All
          </button>
        )}
        <div className="favourites__movies">
          <FavouritesMoviesComponent></FavouritesMoviesComponent>
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
