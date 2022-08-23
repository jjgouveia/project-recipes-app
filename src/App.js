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
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks" component={ Drinks } />
          <Route
            path="foods/:id-da-receita"
            render={ (props) => <Foods { ...props } /> }
          />
          <Route
            path="drinks/:id-da-receita}"
            render={ (props) => <Drinks { ...props } /> }
          />
          <Route
            path="/foods/:id-da-receita/in-progress"
            render={ (props) => <Foods { ...props } /> }
          />
          <Route
            path="/drinks/:id-da-receita/in-progress"
            render={ (props) => <Drinks { ...props } /> }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
