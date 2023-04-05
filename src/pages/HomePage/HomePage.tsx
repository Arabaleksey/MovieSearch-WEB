import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchMovies } from "../../store/reducers/actionCreator";
import Loader from "../../components/Loader/Loader";
import {
  deleteArrayMovies,
  clearHomePage,
} from "../../store/reducers/movieSlice";
import { addToFavourites } from "../../store/reducers/favouriteSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useScrollHandler } from "../../hooks/useScrollHandler";
import "./style.css";
import SearchInput from "../../components/SearchInputForHomePage/SearchInputForHomePage";
import { useHistory, useLocation } from "react-router-dom";
import { UpButton } from "../../components/UpButton/UpButton";
import { ThumbUpOffAlt } from "@mui/icons-material";

const HomePage = () => {
  const router = useHistory();
  const dispatch = useAppDispatch();
  const { movies, isLoading, isError } = useAppSelector(
    (state) => state.movieReducer
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [lastSearchValue, setLastSearchValue] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const location = useLocation();
  useEffect(() => {
    console.log("Location changed");
    dispatch(clearHomePage());
  }, [location]);

  const debounceOnChange = useDebounce((e: any) => {
    setSearchValue(e.target.value);
  }, 500);

  useScrollHandler(setIsFetching);

  useEffect(() => {
    if (lastSearchValue !== searchValue) {
      dispatch(deleteArrayMovies());
    }
    dispatch(
      fetchMovies({
        searchValue,
        currentPage,
      })
    );
    setLastSearchValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (isFetching) {
      dispatch(
        fetchMovies({
          searchValue,
          currentPage: currentPage + 1,
        })
      );
      setCurrentPage(currentPage + 1);
    }
  }, [isFetching]);

  useEffect(() => {
    if (!isLoading) {
      setIsFetching(false);
    }
  }, [isLoading]);

  return (
    <div className={!movies.length ? "main" : "main__background"}>
      <SearchInput debounceOnChange={debounceOnChange}></SearchInput>
      <div className="main__container">
        {isLoading && <Loader />}
        {isError && <h1>{isError}</h1>}
        <div className="main__movies">
          {movies.length ? (
            movies.map((movie) => (
              <div className="main__movie-card" key={movie.imdbID}>
                <div className="main__movie-block">
                  <img
                    onClick={(e) => {
                      router.push(`/MovieInfo/${movie.imdbID}`);
                    }}
                    src={
                      movie.Poster === "N/A"
                        ? "https://cdn-icons-png.flaticon.com/512/84/84275.png"
                        : movie.Poster
                    }
                    alt="Some pict"
                  />
                  <h3 className="main__movie-title">{movie.Title}</h3>
                  <p className="main__movie-release">
                    Type - {movie.Type} ({movie.Year})
                  </p>
                  <p className="main__movie-type"> </p>

                  <div
                    className="main__saveToFavourite"
                    onClick={() => dispatch(addToFavourites(movie))}
                  >
                    <ThumbUpOffAlt sx={{ fontSize: 30 }} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <UpButton></UpButton>
      </div>
    </div>
  );
};

export default HomePage;
