import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Routes } from "../../constants/Routes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../store/reducers/actionCreator";
import Loader from "../../components/Loader/Loader";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.authReducer);
  const { isActivated, isAuth } = useAppSelector((state) => state.authReducer);
  const Logout = () => {
    dispatch(logout());
  };

  function getFirstLetter(email: string) {
    if (!email) return email;

    return email[0].toUpperCase();
  }
  const { loading } = useAppSelector((state) => state.authReducer);

  const { favouriteMovies } = useAppSelector(
    (state) => state.movieFavouriteReducer
  );

  const popUpRef = useRef();

  useOutsideClick(popUpRef, () => {
    setModalOpen(false);
  });

  return (
    <>
      {loading && <Loader></Loader>}
      <div className="header">
        <div className="header__container">
          <h2 className="header__title">
            MOVIES <span>SEARCH</span>
          </h2>
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

              <li className="header__authInfo">
                {isAuth ? (
                  <>
                    <div
                      ref={popUpRef}
                      className="header__authInfo-block"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      <div className="header__authFirstLetter">
                        <p>{getFirstLetter(email)}</p>
                      </div>
                      <p className="header__authName">{email}</p>
                    </div>
                    {modalOpen && (
                      <div className="header__dropdown">
                        {!isActivated && (
                          <p>
                            After registration activate your account by mail to
                            get access to saving the movie
                          </p>
                        )}
                        <button
                          onClick={() => {
                            setModalOpen(false),
                              Logout(),
                              history.push("/home");
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="header__signIn-container">
                    <div
                      className="header__signIn"
                      onClick={() => history.push("/auth")}
                    >
                      <div className="">Sign in</div>
                    </div>
                  </div>
                )}

                <div></div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
