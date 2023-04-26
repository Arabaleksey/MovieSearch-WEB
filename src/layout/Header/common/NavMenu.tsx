import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../../constants/Routes";
import { useAppSelector } from "../../../hooks/useAppSelector";
import UserPersona from "./UserPersona";

const NavMenu = () => {
  const { isActivated, isAuth } = useAppSelector((state) => state.userReducer);

  const { favouriteMovies } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );

  return (
    <>
      <nav className="header__nav">
        <ul className="header__nav-links">
          <li>
            <Link to={Routes.HOME}>Home</Link>
          </li>
          {isAuth && isActivated && (
            <li>
              <Link to={Routes.FAVOURITES}>Favourites</Link>
              <span className="header__link-county">
                {favouriteMovies.length}
              </span>
            </li>
          )}
          <UserPersona />
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
