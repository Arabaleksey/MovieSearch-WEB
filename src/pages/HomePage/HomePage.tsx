import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchMovies } from "../../store/reducers/actionCreator";
import Loader from "../../components/Loader/Loader";
import {
  deleteArrayMovies,
  clearHomePage,
} from "../../store/reducers/movieSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useScrollHandler } from "../../hooks/useScrollHandler";
import "./style.css";
import SearchInput from "../../components/SearchInputForHomePage/SearchInputForHomePage";
import { useLocation } from "react-router-dom";
import { UpButton } from "../../components/UpButton/UpButton";
import { clsx } from "clsx";
import HomeMovies from "../../components/HomeMoviesComponent/HomeMoviesComponent";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading, isError } = useAppSelector(
    (state) => state.movieReducer
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [lastSearchValue, setLastSearchValue] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const location = useLocation();
  useEffect(() => {
    dispatch(clearHomePage());
  }, [location]);

  const debounceOnChange = useDebounce((e: any) => {
    setSearchValue(e.target.value);
  }, 500);

  useScrollHandler(setIsFetching);

  const getMovies = () => {
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
  };

  useEffect(() => {
    getMovies();
  }, [searchValue]);

  const usePagination = () => {
    if (isFetching) {
      dispatch(
        fetchMovies({
          searchValue,
          currentPage: currentPage + 1,
        })
      );
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    usePagination();
  }, [isFetching]);

  useEffect(() => {
    if (!isLoading) {
      setIsFetching(false);
    }
  }, [isLoading]);

  return (
    <div className={clsx("main__background", !movies.length && "main")}>
      {" "}
      <SearchInput debounceOnChange={debounceOnChange}></SearchInput>
      <div className="main__container">
        {isLoading && <Loader />}
        {isError && <h1>{isError}</h1>}
        <div className="main__movies">
          {" "}
          <HomeMovies></HomeMovies>
        </div>
        <UpButton />
      </div>
    </div>
  );
};

export default HomePage;
