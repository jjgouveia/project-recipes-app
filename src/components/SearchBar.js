import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipeAPI from '../services/recipeAPI';
import CardsList from './CardsList';
import AppContext from '../context/AppContext';

export default function SearchBar() {
  const { apiResponse, setApiResponse } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const [searchTextInput, setSearchTextInput] = useState({
    text: '',
    textLength: 0,
  });
  const [radioValue, setRadioValue] = useState('');

  const [renderCardsList, setRenderCardsList] = useState(false);

  const handleSearch = ({ target: { type, value } }) => {
    if (type === 'text') {
      setSearchTextInput({ text: value, textLength: value.length });
    }
    if (type === 'radio') {
      setRadioValue(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const MAX_LENGTH = 1;
    if (radioValue === 'first-letter' && searchTextInput.textLength > MAX_LENGTH) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await recipeAPI(radioValue, searchTextInput.text, pathname);
      setApiResponse(response);
    }
  };

  useEffect(() => {
    if (pathname === '/foods' && apiResponse.meals.length === 1) {
      history.push(`/foods/${apiResponse.meals[0].idMeal}`);
    } else if (pathname === '/foods' && apiResponse.meals.length > 1) {
      setRenderCardsList(true);
    } else if (pathname === '/drinks' && apiResponse.drinks.length === 1) {
      history.push(`/drinks/${apiResponse.drinks[0].idDrink}`);
    } else if (pathname === '/drinks' && apiResponse.drinks.length > 1) {
      setRenderCardsList(true);
    }
  }, [apiResponse]);

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="search-input">
          <input
            type="text"
            data-testid="search-input"
            placeholder="Hmmmmmmmm..."
            onChange={ handleSearch }
            value={ searchTextInput.text }
          />
        </label>
        <label htmlFor="ingredient-search-radio">
          Ingredient
          <input
            type="radio"
            name="search-radio"
            value="ingredient"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            onChange={ handleSearch }
          />
        </label>
        <label htmlFor="name-search-radio">
          Name
          <input
            type="radio"
            name="search-radio"
            value="name"
            id="name-search-radio"
            data-testid="name-search-radio"
            onChange={ handleSearch }
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          First Letter
          <input
            type="radio"
            name="search-radio"
            value="first-letter"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            onChange={ handleSearch }
          />
        </label>
        <button
          type="submit"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </form>
      <div>
        { renderCardsList && <CardsList pathname={ pathname } />}
      </div>
    </>
  );
}
