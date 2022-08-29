import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DoneRecipeButton from '../components/DoneRecipeButton';
import Header from '../components/Header';

export default function DoneRecipes() {
  const history = useHistory();
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

  const filterRecipes = ({ target: { innerHTML } }) => {
    console.log(innerHTML);
    if (innerHTML === 'All') {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')) || []);
    } else if (innerHTML === 'Food') {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes'))
        .filter((recipe) => recipe.type === 'food') || []);
    } else {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes'))
        .filter((recipe) => recipe.type === 'drink') || []);
    }
  };

  const redirectToDetails = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

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
          onClick={ filterRecipes }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterRecipes }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterRecipes }
        >
          Drinks
        </button>
      </div>
      {doneRecipes.map((recipe, index) => (
        recipe.type === 'food' ? (
          <div key={ recipe.name }>
            <div
              onClick={ () => redirectToDetails(recipe.type, recipe.id) }
              onKeyDown={ () => redirectToDetails(recipe.type, recipe.id) }
              role="button"
              tabIndex={ 0 }
            >
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
            </div>
            <div
              onClick={ () => redirectToDetails(recipe.type, recipe.id) }
              onKeyDown={ () => redirectToDetails(recipe.type, recipe.id) }
              role="button"
              tabIndex={ 0 }
            >
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h2>
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <DoneRecipeButton recipe={ recipe } index={ index } />
            {showTags(recipe, index)}
          </div>
        ) : (
          <div key={ `${recipe.name}123` }>
            <div
              onClick={ () => redirectToDetails(recipe.type, recipe.id) }
              onKeyDown={ () => redirectToDetails(recipe.type, recipe.id) }
              role="button"
              tabIndex={ 0 }
            >
              <img
                alt="foto-receita"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                style={ { width: '200px' } }
              />
            </div>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </h3>
            <div
              onClick={ () => redirectToDetails(recipe.type, recipe.id) }
              onKeyDown={ () => redirectToDetails(recipe.type, recipe.id) }
              role="button"
              tabIndex={ 0 }
            >
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h2>
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <DoneRecipeButton recipe={ recipe } index={ index } />
            {showTags(recipe, index)}
          </div>
        )
      ))}
    </div>
  );
}
