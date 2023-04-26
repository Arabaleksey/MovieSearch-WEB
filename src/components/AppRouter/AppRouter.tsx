import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage.tsx/ErrorPage";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import MainPage from "../../pages/HomePage/HomePage";
import MovieInfo from "../../pages/MovieInfo/MovieInfo";
import { Routes } from "../../constants/Routes";
import AuthPage from "../../pages/AuthPage/AuthPage";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../Loader/Loader";

const AppRouter = () => {
  const { isAuth, isActivated, loading } = useAppSelector(
    (state) => state.userReducer
  );
  return (
    <Switch>
      <Route path={Routes.HOME}>
        <MainPage></MainPage>
      </Route>
      <Route exact path="/">
        <Redirect to={Routes.HOME}></Redirect>
      </Route>
      {isAuth && isActivated && (
        <Route path={Routes.FAVOURITES}>
          <FavouritesPage></FavouritesPage>
        </Route>
      )}
      <Route path={Routes.ERROR}>
        <ErrorPage></ErrorPage>
      </Route>
      <Route path={Routes.MOVIE_INFO_ID}>
        <MovieInfo></MovieInfo>
      </Route>
      <Route path={Routes.AUTH}>
        <AuthPage></AuthPage>
      </Route>
      <Route path="*">{loading ? <Loader /> : <ErrorPage></ErrorPage>}</Route>
    </Switch>
  );
};

export default AppRouter;
