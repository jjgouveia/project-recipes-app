import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { fetchContent } from '../services/recipeAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeInProgress.css';
import { setLocalStorageFavorite } from '../services/setKeys';

const copy = require('clipboard-copy');

export default function RecipeInProgressFood() {
  const history = useHistory();
  const { id } = useParams();
  const [recipeId, setRecipeId] = useState(0);
  const location = useLocation();
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsQntd, setIngredientsQntd] = useState([]);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const [favIcon, setFavIcon] = useState(whiteHeartIcon);
  const [savedCheckbox, setSavedCheckbox] = useState([]);
  const favorites = useMemo(() => (localStorage
    .getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : []), []);

  const type = location.pathname.split('/')[1];

  const fetchingData = useCallback(async () => {
    if (type === 'foods') {
      setRecipe(await fetchContent(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
    } else {
      setRecipe(await fetchContent(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
    }
  }, [id, type]);

  useEffect(() => {
    setRecipeId(id);
    if (!localStorage.getItem('stepsChecked')) {
      localStorage.setItem('stepsChecked', JSON.stringify({}));
    }
    const savedRecipe = JSON.parse(localStorage.getItem('stepsChecked'));

    if (savedRecipe[id]) {
      setSavedCheckbox(savedRecipe[id]);
    }
  }, [id]);

  const verifyFavoriteLocalStorage = useCallback(() => {
    const favoritesArray = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const isFavorite = favoritesArray.find(((favorite) => favorite.id === id));
    if (isFavorite) {
      setFavIcon(blackHeartIcon);
    } else {
      setFavIcon(whiteHeartIcon);
    }
  }, [id]);

  const setFavRecipe = () => {
    if (favIcon === whiteHeartIcon) {
      const favoriteRecipe = {
        id,
        type: (type === 'foods' ? 'food' : 'drink'),
        nationality: (type === 'foods' ? recipe.meals[0].strArea : ''),
        category: (type === 'foods'
          ? recipe.meals[0].strCategory : recipe.drinks[0].strCategory),
        alcoholicOrNot: (type === 'foods' ? '' : recipe.drinks[0].strAlcoholic),
        name: (type === 'foods' ? recipe.meals[0].strMeal : recipe.drinks[0].strDrink),
        image: (type === 'foods'
          ? recipe.meals[0].strMealThumb : recipe.drinks[0].strDrinkThumb),
      };
      setLocalStorageFavorite(favoriteRecipe);
    } else {
      const filteredArray = favorites.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredArray));
    }
  };

  useEffect(() => {
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

  const handleCheck = ({ target: { checked, id: ide } }, index) => {
    if (!checked) {
      document
        .getElementById(ide).className = '';
      const savedRecipe = JSON.parse(localStorage.getItem('stepsChecked'));
      delete (savedRecipe[recipeId][index]);
      localStorage.setItem('stepsChecked', JSON.stringify(savedRecipe));
    } else {
      document
        .getElementById(ide).className = 'checked';
      if (!localStorage.getItem('stepsChecked')) {
        localStorage
          .setItem('stepsChecked', JSON.stringify({ [recipeId]: { [index]: true } }));
      }
      const savedRecipe = JSON.parse(localStorage.getItem('stepsChecked'));
      localStorage.setItem('stepsChecked',
        JSON.stringify({ [recipeId]: { [index]: true, ...savedRecipe[recipeId] } }));
    }
    const savedRecipe = JSON.parse(localStorage.getItem('stepsChecked'));
    setSavedCheckbox(savedRecipe[recipeId]);
  };

  const handleShare = () => {
    const FIVE = 5;
    const url = window.location.href.split('/', FIVE).join('/');
    setShowCopyMsg(true);
    copy(`${url}`);
  };

  const handleFinish = () => {
    history.push('/done-recipes');
  };

  const addFavoriteRecipe = () => {
    setFavRecipe();
    verifyFavoriteLocalStorage();
  };

  useEffect(() => {
    fetchingData();
    verifyFavoriteLocalStorage();
  }, [fetchingData, recipe, verifyFavoriteLocalStorage]);

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
                      <span
                        id={ `ingredient - ${index}` }
                        className={ savedCheckbox[index] ? 'checked' : '' }
                      >
                        {ingredientsQntd[index]}
                    &nbsp;
                        {ingredient}
                    &nbsp;
                      </span>
                      <input
                        type="checkbox"
                        id={ `ingredient - ${index}` }
                        name={ ingredient }
                        onChange={ (event) => handleCheck(event, index) }
                        checked={ !!savedCheckbox[index] }

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
                onClick={ handleShare }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                />

                Compartilhar
              </button>
              {showCopyMsg && <h4>Link copied!</h4>}
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ addFavoriteRecipe }
                src={ favIcon }
              >
                <img
                  src={ favIcon }
                  alt="favorite"
                />

                Favoritar
              </button>
              <button
                type="button"
                data-testid="finish-recipe-btn"
                onClick={ handleFinish }
              >
                Finish Recipe
              </button>
            </div>
          </div>
        </>)}
    </div>
  );
}
