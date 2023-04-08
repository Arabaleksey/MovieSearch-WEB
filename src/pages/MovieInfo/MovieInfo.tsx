import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import React, { useEffect, FC } from "react";
import { fetchMovieById } from "../../store/reducers/actionCreator";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./style.css";
import InfoMovieComponent from "../../components/InfoMovieComponent/InfoMovieComponent";

const MovieInfo: FC = () => {
  const params = useParams<any>();
  const movieId = params.id;

  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector(
    (state) => state.movieInfoReducer
  );

  useEffect(() => {
    dispatch(
      fetchMovieById({
        movieId,
      })
    );
  }, [movieId]);
  return (
    <div className="movieInfo">
      <div className="movieInfo__container">
        {isError && <h1>{isError}</h1>}
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <InfoMovieComponent></InfoMovieComponent>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
