import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const maxItens = 12;
const Recipes = ({ apiResponse, pathname }) => (
  <div>
    { pathname === '/foods' ? apiResponse.meals.slice(0, maxItens).map((meal, index) => (
      <Card type={ meal } key={ index } index={ index } pathname="/foods" />
    )) : apiResponse.drinks.slice(0, maxItens).map((drink, index) => (
      <Card type={ drink } key={ index } index={ index } pathname="/drinks" />
    ))}
  </div>
);

Recipes.propTypes = {
  apiResponse: PropTypes.shape(),
  pathname: PropTypes.string,
}.isRequired;

export default Recipes;
