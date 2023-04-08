import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage.tsx/ErrorPage";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import MainPage from "../../pages/HomePage/HomePage";
import MovieInfo from "../../pages/MovieInfo/MovieInfo";
import { Routes } from "../../constants/Routes";
import ErrorBoundary from "../ErrorrBoundary/ErrorBoundary";

const AppRouter = () => {
  return (
    <Switch>
      <Route path={Routes.HOME}>
        <MainPage></MainPage>
      </Route>
      <Route exact path="/">
        <Redirect to={Routes.HOME}></Redirect>
      </Route>
      <Route path={Routes.FAVOURITES}>
        <FavouritesPage></FavouritesPage>
      </Route>
      <Route path={Routes.ERROR}>
        <ErrorPage></ErrorPage>
      </Route>
      <Route path={Routes.MOVIE_INFO_ID}>
        <MovieInfo></MovieInfo>
      </Route>
      <Route path="*">
        <ErrorPage></ErrorPage>
      </Route>
    </Switch>
  );
};

export default AppRouter;
