import React from 'react';
import PropTypes from 'prop-types';

function Button({ onClick, dataTestId, src, alt, btnText }) {
  // const [favIcon, setFavIcon] = useState(whiteHeartIcon);
  return (
    <button
      onClick={ onClick }
      type="button"
      data-testid={ dataTestId }
      src={ src }
    >
      <img
        src={ src }
        alt={ alt }
      />
      {btnText}
    </button>
  );
}

Button.propTypes = {
  props: PropTypes.shape({}),
}.isRequired;

export default Button;
