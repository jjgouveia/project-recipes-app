import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeButton(props) {
  const { index, recipe } = props;
  const { id, type } = recipe;
  const [showCopyMsg, setShowCopyMsg] = useState(false);

  const handleShare = () => {
    setShowCopyMsg(!showCopyMsg);
    const recipeType = type === 'drink' ? 'drinks' : 'foods';
    navigator.clipboard.writeText(`http://localhost:3000/${recipeType}/${id}`);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          src={ shareIcon }
          alt="Share button"
          data-testid={ `${index}-horizontal-share-btn` }
        />
        &nbsp;
        Compartilhar
      </button>
      { showCopyMsg && <h4>Link copied!</h4>}
    </div>
  );
}

DoneRecipeButton.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({}),
}.isRequired;

export default DoneRecipeButton;
