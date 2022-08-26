import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/drinks/:id" component={ RecipeDetails } />
          <Route path="/foods/:id" component={ RecipeDetails } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
