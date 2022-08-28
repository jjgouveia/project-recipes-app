import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const getDoneRecipes = () => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')) || []);
  };
  useEffect(() => {
    getDoneRecipes();
  }, []);
  return (
    <div>

      <Header title="Done Recipes" />
      {
        doneRecipes.map((recipe, index) => (
          <div key={ recipe.name }>
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
            <img
              alt="foto-receita"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              style={ { width: '200px' } }
            />
            <h3 data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</h3>
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Compartilhar
            </button>
            {recipe.tags.map((tagName) => (
              <p
                key={ tagName }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </p>))}
          </div>
        ))
      }
    </div>
  );
}
