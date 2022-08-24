import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [login, setLogin] = useState('');
  const [apiResponse, setApiResponse] = useState({
    meals: [],
    drinks: [],
  });

  return (
    <AppContext.Provider
      value={ {
        login,
        setLogin,
        apiResponse,
        setApiResponse,
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
