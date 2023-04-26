import React, { useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { logout } from "../../../store/reducers/actionCreator";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

const UserPersona = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const { isActivated, isAuth } = useAppSelector((state) => state.userReducer);
  const { email } = useAppSelector((state) => state.userReducer);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const getFirstLetter = (email: string) => {
    if (!email) return email;

    return email[0].toUpperCase();
  };

  const popUpRef = useRef();
  useOutsideClick(popUpRef, () => {
    setDropDownOpen(false);
  });

  return (
    <>
      <li className="header__authInfo">
        {isAuth ? (
          <>
            <div
              ref={popUpRef}
              className="header__authInfo-block"
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <div className="header__authFirstLetter">
                <p>{getFirstLetter(email)}</p>
              </div>
              <p className="header__authName">{email}</p>
            </div>
            {dropDownOpen && (
              <div className="header__dropdown">
                {!isActivated && (
                  <p>
                    After registration activate your account by mail to get
                    access to saving the movie
                  </p>
                )}
                <button
                  onClick={() => {
                    setDropDownOpen(false);
                    onLogout();
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
              <div>Sign in</div>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

export default UserPersona;
