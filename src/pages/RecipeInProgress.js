import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchContent } from '../services/recipeAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/RecipeInProgress.css';

export default function RecipeInProgressFood() {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsQntd, setIngredientsQntd] = useState([]);

  const type = location.pathname.split('/')[1];

  const fetchingData = useCallback(async () => {
    if (type === 'foods') {
      setRecipe(await fetchContent(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
    } else {
      setRecipe(await fetchContent(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
    }
  }, [id, type]);

  useEffect(() => {
    fetchingData();
  }, [fetchingData, recipe]);

  useEffect(() => {
    if (!recipe) {
      return [];
    }
    const maxIngredient = 20;
    const newArrI = [];
    const newArrQ = [];
    if (recipe !== undefined) {
      for (let index = 1; index <= maxIngredient; index += 1) {
        const keyI = `strIngredient${index}`;
        const keyQ = `strMeasure${index}`;
        if (type === 'foods') {
          newArrI.push(recipe.meals[0][keyI]);
          newArrQ.push(recipe.meals[0][keyQ]);
        } else {
          newArrI.push(recipe.drinks[0][keyI]);
          newArrQ.push(recipe.drinks[0][keyQ]);
        }
      }
      setIngredients([...newArrI].filter(Boolean));
      setIngredientsQntd([...newArrQ].filter(Boolean));
    }
  }, [recipe, type]);

  const handleCheck = ({ target: { checked, id: ide } }) => {
    if (checked) {
      document
        .getElementById(ide).className = 'checked';
    } else {
      document
        .getElementById(ide).className = '';
    }
  };

  return (
    <div className="">
      { recipe && (
        <>
          <h1 data-testid="recipe-title">
            {
              type === 'foods' ? recipe.meals[0].strMeal : recipe.drinks[0].strDrink
            }
          </h1>
          <img
            src={ type === 'foods'
              ? recipe.meals[0].strMealThumb
              : recipe.drinks[0].strDrinkThumb }
            data-testid="recipe-photo"
            alt={ type === 'foods'
              ? recipe.meals[0].strMeal
              : recipe.drinks[0].strDrink }
          />
          <div>
            <h4 data-testid="recipe-category">
              {type === 'foods'
                ? recipe.meals[0].strCategory : recipe.drinks[0].strCategory}
            </h4>
          </div>
          <div>
            <ul>
              {ingredients.map(
                (ingredient, index) => (
                  <li className="" key={ index }>
                    <label
                      htmlFor={ `ingredient - ${index}` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <span id={ `ingredient - ${index}` }>
                        {ingredientsQntd[index]}
                    &nbsp;
                        {ingredient}
                    &nbsp;
                      </span>
                      <input
                        type="checkbox"
                        id={ `ingredient - ${index}` }
                        name={ ingredient }
                        onClick={ handleCheck }
                      />
                    </label>
                  </li>),
              )}
            </ul>
            <div data-testid="instructions">
              {type === 'foods'
                ? recipe.meals[0].strInstructions
                : recipe.drinks[0].strInstructions}
            </div>
            <div>
              <button
                type="button"
                data-testid="share-btn"
              >
                <img
                  src={ shareIcon }
                  alt="share"
                />

                Compartilhar
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
              >
                <img
                  src={ whiteHeartIcon }
                  alt="favorite"
                />

                Favoritar
              </button>
              <button type="button" data-testid="finish-recipe-btn">
                Finish Recipe
              </button>
            </div>
          </div>
        </>)}
    </div>
  );
}
