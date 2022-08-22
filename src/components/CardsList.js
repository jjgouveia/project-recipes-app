import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
// import Card from './Card';

function CardsList({ pathname }) {
  console.log(pathname);
  const { apiResponse } = useContext(AppContext);
  console.log(apiResponse);
  const maxItens = 12;
  return (
    <div>
      {pathname === '/foods' ? (
        apiResponse.meals.slice(0, maxItens).map((meal, index) => (
          <Link
            to={ `/foods/${meal.idMeal}` }
            key={ index }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
              <img
                src={ meal.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="food"
                style={ { width: '200px' } }
              />
            </div>
          </Link>
        )))
        : apiResponse.drinks.slice(0, maxItens).map((drink, index) => (
          <Link
            to={ `/drinks/${drink.idDrink}` }
            key={ index }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
              <img
                src={ drink.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="drink"
                style={ { width: '200px' } }
              />
            </div>
          </Link>)) }
    </div>
  );
}

CardsList.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default CardsList;
