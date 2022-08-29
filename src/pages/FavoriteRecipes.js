import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
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

  // const removeFavorite = ({ target }) => {
  //   console.log(target);
  //   // const filteredFavorites = favoriteRecipes.filter((favorite) => )
  // };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);
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
              // onClick={ removeFavorite }
            >
              Desfavoritar
            </button>
          </div>
        ) : (
          <div key={ `${recipe.name}123` }>
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
              // onClick={ removeFavorite }
            >
              Favoritar
            </button>
          </div>
        )
      ))}
    </div>
  );
}
