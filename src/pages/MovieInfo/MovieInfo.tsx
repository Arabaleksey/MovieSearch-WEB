import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import React, { useEffect, FC } from "react";
import { fetchMovieById } from "../../store/reducers/actionCreator";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./style.css";
import { addToFavourites } from "../../store/reducers/favouriteSlice";

const MovieInfo: FC = () => {
  const params: any = useParams();
  const movieId = params.id;

  const dispatch = useAppDispatch();
  const { movie, isLoading, isError } = useAppSelector(
    (state) => state.movieInfoReducer
  );

  useEffect(() => {
    dispatch(
      fetchMovieById({
        movieId,
      })
    );
  }, [movieId]);

  console.log(movie);
  return (
    <div className="movieInfo">
      <div className="movieInfo__container">
        {isError && <h1>{isError}</h1>}
        {isLoading ? (
          <Loader></Loader>
        ) : (
          movie.map((item) => (
            <div className="movieInfo__wrapper" key={item.imdbID}>
              <div className="movieInfo__col-2">
                <img className="movieInfo__image" src={item.Poster}></img>
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
                <button
                  className="movieInfo__btn"
                  onClick={() => dispatch(addToFavourites(item))}
                >
                  Favourite
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
