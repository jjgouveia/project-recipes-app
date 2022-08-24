import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

export default function Drinks({ location: { pathname } }) {
  const { apiResponse } = useContext(AppContext);
  const { drinks } = apiResponse;
  if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;

  const maxItens = 12;

  return (
    <>
      <div>
        {pathname === '/drinks' && <Header title="Drinks" />}
      </div>
      <div>
        {apiResponse.drinks.slice(0, maxItens).map((drink, index) => (
          <Card type={ drink } key={ index } index={ index } pathname="/drinks" />
        ))}
      </div>
    </>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;
