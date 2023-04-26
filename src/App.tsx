import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Header from "./layout/Header/Header";
import AppRouter from "./components/AppRouter/AppRouter";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkAuth } from "./store/reducers/actionCreator";
import { useAppSelector } from "./hooks/useAppSelector";
import { LOCAL_STORAGE_KEYS } from "./constants/LocalStorageKeys";


function App() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(
    (state) => state.userReducer
  );

  const checkWebSiteOnAuth = () => {
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)) {
      dispatch(checkAuth());
    }
  };

  useEffect(() => {
    checkWebSiteOnAuth();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
