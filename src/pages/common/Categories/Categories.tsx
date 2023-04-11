import React from "react";
import "./style.css";
import { ICategories } from "../../../interfaces/MovieInterfaces";
import { filterMovie } from "../../../store/reducers/favouriteSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

const Categories = () => {
  const dispatch = useAppDispatch();
  const chooseCategory = (category: any) => {
    dispatch(filterMovie(category));
  };
  const categories: ICategories[] = [
    { key: "all", name: "All" },
    { key: "movie", name: "Movies" },
    { key: "series", name: "Series" },
    { key: "game", name: "Games" },
  ];
  return (
    <div className="categories">
      {categories.map((el) => (
        <div key={el.key} onClick={() => chooseCategory(el.key)}>
          {" "}
          {el.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
