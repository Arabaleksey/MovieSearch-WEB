import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useAppSelector } from "../../hooks/useAppSelector";

const Header = () => {
  const { favouriteMovie } = useAppSelector((state) => state.movieFavouriteReducer);
  return (
    <div className="header">
      <div className="header__container">
        <h2 className="header__title">
          MOVIES <span>SEARCH</span>
        </h2>
        <nav className="header__nav">
          <ul className="header__nav-links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
              <span className="header__link-county">{favouriteMovie.length}</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
