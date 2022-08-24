import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Foods({ location }) {
  const { apiResponse } = useContext(AppContext);
  const { meals } = apiResponse;
  if (meals.length === 1) return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
  const maxItens = 12;

  return (
    <>
      <div>
        {location.pathname === '/foods' && <Header title="Foods" />}
      </div>
      <div>
        { apiResponse.meals.slice(0, maxItens).map((meal, index) => (
          <Card type={ meal } key={ index } index={ index } pathname="/foods" />
        ))}
      </div>
    </>

  );
}

export default Foods;

Foods.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;
