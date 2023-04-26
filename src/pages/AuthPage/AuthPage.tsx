import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useHistory } from "react-router-dom";
import "./style.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import LoginFormComponent from "../common/AuthFormComponent/LoginFormComponent";
import RegistrationFormComponent from "../common/AuthFormComponent/RegistrationFormComponent";
import { clsx } from "clsx";

const AuthPage: FC = () => {
  const [toggleState, setToggleState] = useState(1);

  const history = useHistory();

  const { errorLogin, errorRegistration, isAuth } = useAppSelector(
    (state) => state.userReducer
  );
  if (isAuth && (!errorRegistration || !errorLogin)) {
    history.push("/home");
  }

  return (
    <div className="signIn">
      <div className="signIn__container">
        <div className="signIn__tabs">
          <button
            className={
              clsx("signIn__tab", toggleState === 1 && "signIn__tab active__tabs")
            }
            onClick={() => {setToggleState(1)}}
          >
            Sign up
          </button>
          <button
            className={
              clsx("signIn__tab", toggleState === 2 && "signIn__tab active__tabs")
            }
            onClick={() => setToggleState(2)}
          >
            Sign in
          </button>
        </div>
        <div className="signIn__tabContent">
          <div
          className={
            clsx("signIn__content", toggleState === 1 && "signIn__content active-content")
          }
          >
            <RegistrationFormComponent></RegistrationFormComponent>
          </div>
          <div
           className={
            clsx("signIn__content", toggleState === 2 && "signIn__content active-content")
          }
          >
            <LoginFormComponent></LoginFormComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
