import React, { useState } from 'react';
import getFoodAPI from '../services/getFoodAPI';

export default function SearchBar() {
  const [searchTextInput, setSearchTextInput] = useState({
    text: '',
    textLength: 0,
  });
  const [radioValue, setRadioValue] = useState('');

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
      await getFoodAPI(radioValue, searchTextInput.text);
    }
  };

  return (
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
  );
}
