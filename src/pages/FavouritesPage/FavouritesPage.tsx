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
  const [toggleState, setToggleState] = useState<number>(null);

  const dispatch = useAppDispatch();
  const { favouriteMovies } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );
  
  const [search, setSearch] = useState("");

  const debounceOnChange = useDebounce((e: any) => {
    setSearch(e.target.value);
  }, 500);

  useEffect(() => {
    dispatch(serchMovie(search));
  }, [search]);

  return (
    <div className="favourites">
      <div className="favourites__container">
        {!!favouriteMovies.length && (
          <>
            <input onChange={debounceOnChange} />
            <button
              className={toggleState === 1 ? "btn active__btn  " : "btn"}
              onClick={() => {
                dispatch(sortYearDescending());
                setToggleState(1);
              }}
            >
              По убыванию
            </button>
            <button
              className={toggleState === 2 ? "btn active__btn " : "btn"}
              onClick={() => {
                dispatch(sortYearAscending());
                setToggleState(2);
              }}
            >
              По Возрастанию
            </button>
            <Categories />
            <button
              className="favourites__deleteAll"
              onClick={() => dispatch(deleteAllMovies())}
            >
              Delete All
            </button>
          </>
        )}
        <div className="favourites__movies">
          <FavouritesMoviesComponent />
        </div>
        <UpButton />
      </div>
    </div>
  );
};

export default FavouritesPage;
