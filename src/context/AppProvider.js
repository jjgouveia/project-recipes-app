import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { apiCategoryDrinks, apiCategoryFood } from '../services/categoriesAPI';

function AppProvider({ children }) {
  const [login, setLogin] = useState('');
  const [apiResponse, setApiResponse] = useState({
    meals: [],
    drinks: [],
  });

  const [categoriesFoods, setCategoriesFoods] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);

  useEffect(() => {
    apiCategoryFood().then((response) => setCategoriesFoods(response.meals));
    apiCategoryDrinks().then((response) => setCategoriesDrinks(response.drinks));
  }, []);

  return (
    <AppContext.Provider
      value={ {
        login,
        setLogin,
        apiResponse,
        setApiResponse,
        categoriesFoods,
        setCategoriesFoods,
        categoriesDrinks,
        setCategoriesDrinks,
        // recipeAPI,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
