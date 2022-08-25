import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import AppContext from '../context/AppContext';

const Recipes = ({ apiResponse, pathname }) => {
  const maxItens = 12;
  const maxCategory = 5;

  const { categoriesFoods, categoriesDrinks } = useContext(AppContext);

  console.log(categoriesFoods);
  return (
    <div>
      <div>
        { pathname === '/foods'
          ? categoriesFoods.slice(0, maxCategory).map((food) => (
            <button
              data-testid={ `${food.strCategory}-category-filter` }
              type="button"
              key={ food.strCategory }
            >
              { food.strCategory}
            </button>))
          : categoriesDrinks.slice(0, maxCategory).map((drink) => (
            <button
              data-testid={ `${drink.strCategory}-category-filter` }
              type="button"
              key={ drink.strCategory }
            >
              { drink.strCategory}
            </button>
          ))}

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
