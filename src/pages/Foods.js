import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Foods({ location }) {
  return (
    <div>
      {location.pathname === '/foods' && <Header title="Foods" />}
    </div>

  );
}

export default Foods;

Foods.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;
