import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const getDoneRecipes = () => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')) || []);
  };

  const showTags = (recipe, index) => recipe.tags.slice(0, 2).map((tagName) => (
    <h3
      key={ tagName }
      data-testid={ `${index}-${tagName}-horizontal-tag` }
    >
      {tagName}
    </h3>));

  useEffect(() => {
    getDoneRecipes();
  }, []);
  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {doneRecipes.map((recipe, index) => (
        recipe.type === 'food' ? (
          <div key={ recipe.name }>
            <img
              alt="foto-receita"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              style={ { width: '200px' } }
            />
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.nationality}
              {' '}
              -
              {' '}
              {recipe.category}
            </h3>
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              Compartilhar
            </button>
            {showTags(recipe, index)}
          </div>
        ) : (
          <div key={ recipe.name }>
            <img
              alt="foto-receita"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              style={ { width: '200px' } }
            />
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </h3>
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              Compartilhar
            </button>
            {showTags(recipe, index)}
          </div>
        )
      ))}
    </div>
  );
}
