import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  deleteAllMovies,
  deleteChekedMovie,
} from "../../store/reducers/favouriteSlice";
import "./style.css";
import { useHistory } from "react-router-dom";
import { Close } from "@mui/icons-material";

const FavouritesPage = ({ favourites }: any) => {
  const router = useHistory();
  const dispatch = useAppDispatch();
  const { favouriteMovie } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );

  return (
    <div className="favourites" style={{ paddingTop: "60px" }}>
      <div className="favourites__container">
        {favouriteMovie.length ? (
          <button
            className="favourites__deleteAll"
            onClick={() => dispatch(deleteAllMovies())}
          >
            Delete All
          </button>
        ) : (
          <></>
        )}
        <div className="favourites__movies">
          {favouriteMovie.length ? (
            favouriteMovie.map((el: any) => (
              <div className="favourites__movie-card" key={el.imdbID}>
                <div className="favourites__movie-block">
                  <img
                    src={el.Poster}
                    onClick={(e) => {
                      router.push(`/MovieInfo/${el.imdbID}`);
                    }}
                  ></img>
                  <h3 className="favourites__movie-title">{el.Title}</h3>
                  <p className="favourites__movie-release">
                    Type - {el.Type} ({el.Year})
                  </p>
                  <p className="favourites__movie-type"> </p>
                  <div
                    className="favourites__deleteFromFavourite"
                    onClick={() => dispatch(deleteChekedMovie(el))}
                  >
                    <Close sx={{ color: "red", cursor:'pointer' }} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="favourites__nothing">Не найдено сохраненных фильмов</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
