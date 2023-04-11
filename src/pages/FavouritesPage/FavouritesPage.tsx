import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  deleteAllMovies,
  serchMovie,
  sortYearAscending,
  sortYearDescending,
} from "../../store/reducers/favouriteSlice";
import "./style.css";

import FavouritesMoviesComponent from "../common/FavouritesMoviesComponent/FavouritesMoviesComponent";
import { UpButton } from "../../components/UpButton/UpButton";
import Categories from "../common/Categories/Categories";
import { useDebounce } from "../../hooks/useDebounce";

const FavouritesPage = () => {
  const dispatch = useAppDispatch();
  const { favouriteMovies } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );
  const [search, setSearch] = useState<string>("");

  const debounceOnChange = useDebounce((e: any) => {
    setSearch(e.target.value);
  }, 500);
  useEffect(() => {
    dispatch(serchMovie(search));
  }, [search]);

  return (
    <div className="favourites" style={{ paddingTop: "60px" }}>
      <div className="favourites__container">
        {!!favouriteMovies.length && (
          <>
            <input onChange={debounceOnChange}></input>
            <button onClick={() => dispatch(sortYearDescending())}>
              По убыванию
            </button>
            <button onClick={() => dispatch(sortYearAscending())}>
              По Возрастанию
            </button>
            <Categories></Categories>
            <button
              className="favourites__deleteAll"
              onClick={() => dispatch(deleteAllMovies())}
            >
              Delete All
            </button>
          </>
        )}
        <div className="favourites__movies">
          <FavouritesMoviesComponent></FavouritesMoviesComponent>
        </div>
        <UpButton />
      </div>
    </div>
  );
};

export default FavouritesPage;
