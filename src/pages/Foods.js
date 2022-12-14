import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Foods({ location: { pathname } }) {
  const { apiResponse, setApiResponse } = useContext(AppContext);
  const [filtersOn, setFiltersOn] = useState(false);
  const { meals } = apiResponse;
  useEffect(() => {
    if (!localStorage
      .getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const fetchRecipes = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const json = await request.json();
      setApiResponse(json);
    };
    fetchRecipes();
  }, [setApiResponse]);

  if (meals.length === 1 && !filtersOn) {
    return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
  }

  return (
    <>
      <div>
        {pathname === '/foods' && <Header title="Foods" />}
      </div>
      <div>
        <Recipes
          setFiltersOn={ setFiltersOn }
          pathname="/foods"
          apiResponse={ apiResponse }
        />
      </div>
      { pathname === '/foods' && <Footer />}
    </>

  );
}

export default Foods;

Foods.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;
