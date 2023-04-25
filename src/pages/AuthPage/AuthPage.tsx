import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useHistory } from "react-router-dom";
import "./style.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import LoginFormComponent from "../common/AuthFormComponent/LoginFormComponent";
import RegistrationFormComponent from "../common/AuthFormComponent/RegistrationFormComponent";

const AuthPage: FC = () => {
  const [toggleState, setToggleState] = useState(1);

  const history = useHistory();

  const { errorLogin, errorRegistration, isAuth } = useAppSelector(
    (state) => state.authReducer
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
              toggleState === 1 ? "signIn__tab active__tabs" : "signIn__tab"
            }
            onClick={() => {setToggleState(1)}}
          >
            Sign up
          </button>
          <button
            className={
              toggleState === 2 ? "signIn__tab active__tabs" : "signIn__tab"
            }
            onClick={() => setToggleState(2)}
          >
            Login
          </button>
        </div>
        <div className="signIn__tabContent">
          <div
            className={
              toggleState === 1
                ? "signIn__content active-content"
                : "signIn__content"
            }
          >
            <RegistrationFormComponent></RegistrationFormComponent>
          </div>
          <div
            className={
              toggleState === 2
                ? "signIn__content active-content"
                : "signIn__content"
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
