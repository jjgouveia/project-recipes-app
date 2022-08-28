import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeInProgress() {
  const history = useHistory();
  const handleClick = () => {
    history.push('/done-recipes');
  };
  return (
    <div>
      RecipeInProgress
      <button
        data-testid="ingredient-step"
        type="button"
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}
