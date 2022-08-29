import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const history = useHistory();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favIcon] = useState(blackHeartIcon);
  const [showCopyMsg, setShowCopyMsg] = useState(false);

  const handleShare = (recipe) => {
    const { id, type } = recipe;
    setShowCopyMsg(!showCopyMsg);
    const recipeType = type === 'drink' ? 'drinks' : 'foods';
    navigator.clipboard.writeText(`http://localhost:3000/${recipeType}/${id}`);
  };

  const getFavoriteRecipes = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    console.log(favoriteRecipes);
  };

  const redirectToDetails = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  // const removeFavorite = (favoriteId) => {
  // const filteredFavorites = favoriteRecipes.filter((favorite) => (
  //   favorite.id !== favoriteId));
  // setFavoriteRecipes(filteredFavorites);
  // };

  const removeFavorite = (favoriteId) => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((favorite) => (
        favorite.id !== favoriteId)) || []);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);
  return (
    <div>
      <Header title="Favorite Recipes" />
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
      {favoriteRecipes.map((recipe, index) => (
        recipe.type === 'food' ? (
          <div key={ recipe.name }>
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
            </div>
            <div
              onClick={ () => redirectToDetails(recipe.type, recipe.id) }
              onKeyDown={ () => redirectToDetails(recipe.type, recipe.id) }
              role="button"
              tabIndex={ 0 }
            >
              <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              onClick={ () => handleShare(recipe) }
            >
              <img
                src={ shareIcon }
                alt="Share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              Compartilhar
            </button>
            { showCopyMsg && <h4>Link copied!</h4>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ favIcon }
              onClick={ () => removeFavorite(recipe.id) }
            >
              Desfavoritar
            </button>
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
              <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              onClick={ () => handleShare(recipe) }
            >
              <img
                src={ shareIcon }
                alt="Share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              Compartilhar
            </button>
            { showCopyMsg && <h4>Link copied!</h4>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ favIcon }
              onClick={ () => removeFavorite(recipe.id) }
            >
              Favoritar
            </button>
          </div>
        )
      ))}
    </div>
  );
}
