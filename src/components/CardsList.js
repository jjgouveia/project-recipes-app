import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import Card from './Card';

function CardsList({ pathname }) {
  const { apiResponse } = useContext(AppContext);
  const maxItens = 12;
  return (
    <div>
      {pathname === '/foods' ? (
        apiResponse.meals.slice(0, maxItens).map((meal, index) => (
          <Card type={ meal } key={ index } index={ index } pathname="/foods" />
        )))
        : apiResponse.drinks.slice(0, maxItens).map((drink, index) => (
          <Card type={ drink } key={ index } index={ index } pathname="/drinks" />
        )) }
    </div>
  );
}

CardsList.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default CardsList;
