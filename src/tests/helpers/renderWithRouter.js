import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import AppProvider from '../../context/AppProvider';



function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

export default function renderWithRouter(
  component,
  {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
  } = {},
) {
  return {
    ...render(withRouter(<AppProvider>{component}</AppProvider>, history)),
    history,
  };
}
