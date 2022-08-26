// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { recipeAPI } from '../services/recipeAPI';

// export default function RecipeDetails() {
//   const [recipe, setRecipe] = useState({});
//   const { location: { pathname } } = useHistory();
//   const path = pathname.split('/');
//   console.log(path);

//   useEffect(() => {
//     const getApiRecipe = async () => {
//       const recipeResponse = await recipeAPI('recipe', path[2]);
//       const getResponse = path[1] === 'foods' ? recipeResponse.meals
//         : recipeResponse.drinks;
//       setRecipe(getResponse);
//     };
//     getApiRecipe();
//   }, []);

//   console.log(recipe);

//   return (
//     <section>
//       <h2>RecipeDetails</h2>
//     </section>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { fetchContent } from '../services/recipeAPI';
import Carousel from '../components/Carousel';
import { setLocalStorageRecipeObj } from '../services/setKeys';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails() {
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

  const fetchingData = async () => {
    if (type === 'foods') {
      setRecipe(await fetchContent(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
      setRecomendations(await fetchContent('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    } else {
      setRecipe(await fetchContent(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
      setRecomendations(await fetchContent('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    }
  };

  // se id não estiver dentro de doneRecipes setRecipeDone(false)

  const verifyLocalStorage = () => {
    const doneRecipe = [JSON.parse(localStorage.getItem('doneRecipes'))];
    console.log(doneRecipe);
    if (doneRecipe) {
      const isDone = doneRecipe.some((done) => Number(done.id) === Number(id));
      if (isDone) setRecipeDone(false);
    }
  };

  const handleStartRecipe = () => {
    setRecipeDone(true);
    history.push(`/${type}/${id}/in-progress`);
  };

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setShowCopyMsg(true);
  };

  useEffect(() => {
    fetchingData();
    setLocalStorageRecipeObj(recipeObj);
    verifyLocalStorage();
  }, []);

  useEffect(() => {
    // console.log(recipe);
    // console.log(recomendations);
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
  }, [recipe, recomendations]);

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
              Compartilhar

            </button>
            <button
              type="button"
              data-testid="favorite-btn"
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

          {/* {type === 'foods'
                  ? recomendations.drinks.map(
                    (recomendation, i) => (
                      <div key={ i }>
                        <span data-testid={ `${i}-recomendation-card` }>
                          {recomendation.idDrink}
                        </span>
                      </div>),
                  )
                  : recomendations.meals.map(
                    (recomendation, i) => (
                      <div key={ i }>
                        <span data-testid={ `${i}-recomendation-card` }>
                          {recomendation.idMeal}
                        </span>
                      </div>),
                  )} */
            // </div>
          }

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
            Start Recipe
          </button>
        )}
    </div>
  );
}

export default RecipeDetails;
