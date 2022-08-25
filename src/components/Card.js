import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card({ type, index, pathname }) {
  const { strMeal, strDrink, idMeal, idDrink, strMealThumb, strDrinkThumb } = type;
  return (
    <div>
      <Link
        to={ pathname === '/foods' ? `/foods/${idMeal}` : `/drinks/${idDrink}` }
      >
        <div data-testid={ `${index}-recipe-card` }>
          <h2 data-testid={ `${index}-card-name` }>
            {pathname === '/foods'
              ? strMeal : strDrink}
          </h2>
          <img
            src={ pathname === '/foods' ? strMealThumb : strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt={ pathname === '/foods' ? 'food' : 'drink' }
            style={ { width: '200px' } }
          />
        </div>
      </Link>
    </div>
  );
}

export default Card;

Card.propTypes = {
  type: PropTypes.shape([]),
}.isRequired;
