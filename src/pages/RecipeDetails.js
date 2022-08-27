import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { fetchContent } from '../services/recipeAPI';
import Carousel from '../components/Carousel';
import { setLocalStorageRecipeObj, setLocalStorageFavorite } from '../services/setKeys';
import shareIcon from '../images/shareIcon.svg';
import AppContext from '../context/AppContext';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const { favoriteRecipe,
    setFavoriteRecipe } = useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsQntd, setIngredientsQntd] = useState([]);
  const [recomendations, setRecomendations] = useState();
  const type = location.pathname.split('/')[1];
  const [recipeDone, setRecipeDone] = useState(false);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const [recipeObj] = useState({
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  });
  const verifyRoute = location.pathname.includes('foods');

  const fetchingData = useCallback(async () => {
    if (type === 'foods') {
      setRecipe(await fetchContent(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
      setRecomendations(await fetchContent('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    } else {
      setRecipe(await fetchContent(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
      setRecomendations(await fetchContent('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    }
  }, [id, type]);

  const verifyDoneLocalStorage = useCallback(() => {
    const doneRecipe = [JSON.parse(localStorage.getItem('doneRecipes'))];
    if (doneRecipe) {
      const isDone = doneRecipe.some((done) => Number(done.id) === Number(id));
      if (isDone) setRecipeDone(false);
    }
  }, [id]);

  const setFavRecipe = () => {
    setFavoriteRecipe({
      id,
      type,
      nationality: (type === 'foods' ? recipe.meals[0].strArea : ''),
      category: (type === 'foods'
        ? recipe.meals[0].strCategory : recipe.drinks[0].strCategory),
      alcoholicOrNot: (type === 'foods' ? '' : recipe.drinks[0].strAlcoholic),
      name: (type === 'foods' ? recipe.meals[0].strMeal : recipe.drinks[0].strDrink),
      image: (type === 'foods'
        ? recipe.meals[0].strMealThumb : recipe.drinks[0].strDrinkThumb),
    });
  };

  const handleStartRecipe = () => {
    const mealsOrCocktails = verifyRoute ? 'meals' : 'cocktails';
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let newInProgressRecipe = {};
    if (inProgressRecipes) {
      newInProgressRecipe = {
        ...inProgressRecipes,
        [mealsOrCocktails]: { [id]: ingredients },
      };
    } else {
      newInProgressRecipe = {
        [mealsOrCocktails]: { [id]: ingredients },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipe));
    setContinueRecipe(true);
    history.push(`/${type}/${id}/in-progress`);
  };

  const handleShare = () => {
    setShowCopyMsg(true);
    copy(`http://localhost:3000${history.location.pathname}`);
  };

  const getInProgressRecipes = useCallback(() => {
    const foodsOrDrinks = verifyRoute ? 'meals' : 'cocktails';
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const isInProgress = Object.keys(inProgressRecipes[foodsOrDrinks])
        .some((inProgressRecipe) => inProgressRecipe === id);
      if (isInProgress) setContinueRecipe(true);
    }
  }, [id, verifyRoute]);

  useEffect(() => {
    fetchingData();
    setLocalStorageRecipeObj(recipeObj);
    getInProgressRecipes();
    verifyDoneLocalStorage();
  }, [fetchingData, getInProgressRecipes, recipeObj, verifyDoneLocalStorage]);

  useEffect(() => {
    setLocalStorageFavorite(favoriteRecipe);
  }, [favoriteRecipe]);

  useEffect(() => {
    if (recipe === undefined || recomendations === undefined) return;

    // array de ingredientes e medidas
    const maxIngredient = 20;
    const newArrI = [];
    const newArrQ = [];
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
    setIngredients([...newArrI]);
    setIngredientsQntd([...newArrQ]);
    setLoading(false);
  }, [recipe, recomendations, type]);

  return (
    <div>
      {loading && 'Carregando...'}
      {!loading && (
        <div className="">
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
            <button
              onClick={ handleShare }
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
              onClick={ () => setFavRecipe() }
            >
              Favoritar

            </button>
            {showCopyMsg && <h4>Link copied!</h4>}
          </div>
          <h1 data-testid="recipe-title">
            { type === 'foods'
              ? recipe.meals[0].strMeal
              : recipe.drinks[0].strDrink}

          </h1>
          <h2 data-testid="recipe-category">
            {type === 'foods'
              ? recipe.meals[0].strCategory
              : recipe.drinks[0].strAlcoholic}

          </h2>
          {ingredients.map(
            (ingredient, i) => (
              <div className="" key={ i }>
                <h6 data-testid={ `${i}-ingredient-name-and-measure` }>
                  {ingredientsQntd[i]}
                  {' '}
                  {ingredient}
                </h6>
              </div>),
          )}
          <p data-testid="instructions">
            { type === 'foods'
              ? recipe.meals[0].strInstructions
              : recipe.drinks[0].strInstructions}

          </p>
          {type === 'foods' && (
            <iframe
              width="560"
              data-testid="video"
              height="315"
              src={ `https://www.youtube.com/embed/${recipe.meals[0].strYoutube.split('=')[1]}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay;
             clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          <Carousel
            data={ type === 'foods'
              ? recomendations.drinks : recomendations.meals }
            type={ type }
          />
        </div>

      )}
      {recipeDone ? ''
        : (
          <button
            onClick={ handleStartRecipe }
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: 0 } }
            type="button"
          >
            {continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
    </div>
  );
}

export default RecipeDetails;
