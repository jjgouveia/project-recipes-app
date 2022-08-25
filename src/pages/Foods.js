import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';

function Foods({ location }) {
  const { apiResponse, setApiResponse } = useContext(AppContext);
  const { meals } = apiResponse;
  useEffect(() => {
    const fetchRecipes = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const json = await request.json();
      setApiResponse(json);
    };
    fetchRecipes();
  }, [setApiResponse]);
  console.log(apiResponse);

  if (apiResponse.length === 1) {
    return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
  }

  return (
    <>
      <div>
        {location.pathname === '/foods' && <Header title="Foods" />}
      </div>
      <div>
        <Recipes pathname="/foods" apiResponse={ apiResponse } />
      </div>
    </>

  );
}

export default Foods;

Foods.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;
