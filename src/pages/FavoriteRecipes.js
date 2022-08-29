import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteRecipesFake, setFavoriteRecipesFake] = useState([]);

  const [favIcon] = useState(blackHeartIcon);
  const getFavoriteRecipes = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  };

  const foodFilter = () => {
    const food = favoriteRecipes.filter((elemento) => elemento.type !== 'drink');
    setFavoriteRecipesFake(food);
    setLoading(false);
  };

  const drinkFilter = () => {
    const drink = favoriteRecipes.filter((elemento) => elemento.type !== 'food');
    setFavoriteRecipesFake(drink);
    setLoading(false);
  };

  const allFilter = () => {
    setLoading(true);
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  console.log(favoriteRecipesFake);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ allFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ foodFilter }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ drinkFilter }
        >
          Drinks
        </button>
      </div>
      {(loading ? favoriteRecipes : favoriteRecipesFake).map((recipe, index) => (
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
            >
              <img
                src={ shareIcon }
                alt="Share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              Compartilhar
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ favIcon }
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
            >
              <img
                src={ shareIcon }
                alt="Share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              Compartilhar
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ favIcon }
            >
              Favoritar
            </button>
          </div>
        )
      ))}
    </div>
  );
}
