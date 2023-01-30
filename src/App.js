import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
//  import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route
        exact
        path="/meals/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/:id" component={ Recipes } />
      <Route exact path="/:id" component={ Recipes } />
    </Switch>
  );
}

export default App;
