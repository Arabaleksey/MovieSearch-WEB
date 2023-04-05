import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage.tsx/ErrorPage";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import MainPage from "../../pages/HomePage/HomePage";
import MovieInfo from "../../pages/MovieInfo/MovieInfo";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/home">
        <MainPage></MainPage>
      </Route>
      <Route exact path="/">
        <Redirect to="/home"></Redirect>
      </Route>
      <Route path="/favourites">
        <FavouritesPage></FavouritesPage>
      </Route>
      <Route path="/error">
        <ErrorPage></ErrorPage>
      </Route>
      <Route path="/movieInfo/:id">
        <MovieInfo></MovieInfo>
      </Route>
      <Redirect to="/error"></Redirect>
    </Switch>
  );
};

export default AppRouter;
