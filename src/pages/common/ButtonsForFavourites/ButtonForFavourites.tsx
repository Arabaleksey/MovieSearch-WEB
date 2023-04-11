import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { DeleteOutline, FavoriteBorder } from "@mui/icons-material";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  addToFavourites,
  deleteChekedMovie,
} from "../../../store/reducers/favouriteSlice";

const ButtonForFavourites = ({ movie }) => {
  const dispatch = useAppDispatch();
  const { favouriteMovies } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );
  return (
    <>
      {!favouriteMovies.find(
        (favouriteMovie) => favouriteMovie.imdbID === movie.imdbID
      ) ? (
        <div onClick={() => dispatch(addToFavourites(movie))}>
          <FavoriteBorder sx={{ fontSize: 30 }} />
        </div>
      ) : (
        <div onClick={() => dispatch(deleteChekedMovie(movie))}>
          <DeleteOutline />
        </div>
      )}
    </>
  );
};

export default ButtonForFavourites;
