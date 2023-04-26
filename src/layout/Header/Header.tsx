import React from "react";
import "./style.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../../components/Loader/Loader";
import NavMenu from "./common/NavMenu";

const Header = () => {
  const { loading } = useAppSelector((state) => state.userReducer);

  return (
    <>
      {loading && <Loader/>}
      <div className="header">
        <div className="header__container">
          <h2 className="header__title">
            MOVIES <span>SEARCH</span>
          </h2>
          <NavMenu/>
        </div>
      </div>
    </>
  );
};

export default Header;
