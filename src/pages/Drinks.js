import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

export default function Drinks({ location: { pathname } }) {
  const { apiResponse, setApiResponse } = useContext(AppContext);
  const { drinks } = apiResponse;

  useEffect(() => {
    if (!localStorage
      .getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const fetchRecipes = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const json = await request.json();
      setApiResponse(json);
    };
    fetchRecipes();
  }, [setApiResponse]);

  if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;

  return (
    <>
      <div>
        {pathname === '/drinks' && <Header title="Drinks" />}
      </div>
      <div>
        <Recipes pathname="/drinks" apiResponse={ apiResponse } />
      </div>
      { pathname === '/drinks' && <Footer />}
    </>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;
