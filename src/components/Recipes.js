import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import AppContext from '../context/AppContext';

const Recipes = ({ apiResponse, pathname }) => {
  const maxItens = 12;
  const maxCategory = 5;

  const {
    categoriesFoods,
    categoriesDrinks,
    setApiResponse } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const resetFilters = async () => {
    if (pathname === '/foods') {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const json = await request.json();
      setApiResponse(json);
    } else {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const json = await request.json();
      setApiResponse(json);
    }
  };

  const fetchFood = async (category) => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const json = await request.json();
    setApiResponse(json);
  };

  const fetchDrinks = async (category) => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const json = await request.json();
    setApiResponse(json);
  };

  console.log(apiResponse);

  const filterFood = (e) => {
    fetchFood(e.target.innerText);
    const filteredArray = apiResponse.meals.filter((food) => (
      food.strCategory === e.target.innerText));
    if (loading) {
      setApiResponse((prevResponse) => ({
        ...prevResponse,
        meals: filteredArray,
      }));
      setLoading(!loading);
    } if (loading === false) {
      resetFilters();
      setLoading(!loading);
    }
  };

  const filterDrinks = (e) => {
    fetchDrinks(e.target.innerText);
    const filteredArray = apiResponse.drinks.filter((food) => (
      food.strCategory === e.target.innerText));
    if (loading) {
      setApiResponse((prevResponse) => ({
        ...prevResponse,
        drinks: filteredArray,
      }));
      setLoading(!loading);
    }
    if (loading === false) {
      resetFilters();
      setLoading(!loading);
    }
  };

  return (
    <div>
      <div>
        {
          pathname === '/foods' ? (
            categoriesFoods.slice(0, maxCategory).map((food) => (
              <div key={ food.strCategory }>
                <button
                  data-testid={ `${food.strCategory}-category-filter` }
                  type="button"
                  key={ food.strCategory }
                  onClick={ filterFood }
                >
                  { food.strCategory}
                </button>
              </div>
            ))) : (
            categoriesDrinks.slice(0, maxCategory).map((drink) => (
              <div key={ drink.strCategory }>
                <button
                  data-testid={ `${drink.strCategory}-category-filter` }
                  type="button"
                  key={ drink.strCategory }
                  onClick={ filterDrinks }
                >
                  { drink.strCategory}
                </button>
              </div>
            )))
        }
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ resetFilters }
        >
          All
        </button>
      </div>

      <div>
        { pathname === '/foods' ? apiResponse.meals
          .slice(0, maxItens).map((meal, index) => (
            <Card type={ meal } key={ index } index={ index } pathname="/foods" />
          ))
          : apiResponse.drinks.slice(0, maxItens).map((drink, index) => (
            <Card type={ drink } key={ index } index={ index } pathname="/drinks" />
          ))}
      </div>
    </div>
  );
};

Recipes.propTypes = {
  apiResponse: PropTypes.shape(),
  pathname: PropTypes.string,
}.isRequired;

export default Recipes;
