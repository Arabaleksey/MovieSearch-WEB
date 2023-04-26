import React, { useState } from "react";
import "./style.css";
import { ICategories } from "../../../interfaces/MovieInterfaces";
import { filterMovie } from "../../../store/reducers/favouriteSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { clsx } from "clsx";

const categories: ICategories[] = [
  { key: "all", name: "All" },
  { key: "movie", name: "Movies" },
  { key: "series", name: "Series" },
  { key: "game", name: "Games" },
];

const Categories = () => {
  const dispatch = useAppDispatch();
  const chooseCategory = (category: any) => {
    dispatch(filterMovie(category));
  };

  const [toggleState, setToggleState] = useState("");

  return (
    <div className="categories">
      {categories.map((el) => (
        <div
        className={clsx("btn", toggleState === el.key && "btn active__btns")}
          key={el.key}
          onClick={() => (chooseCategory(el.key), setToggleState(el.key))}
        >
          {el.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
