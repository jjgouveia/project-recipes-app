import React from 'react';

export default function SearchBar() {
  return (
    <form>
      <label htmlFor="search-input">
        <input type="text" data-testid="search-input" placeholder="Hmmmmmmmm..." />
      </label>
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          name="ingrediente"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          name="name"
          id="name-search-radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          type="radio"
          name="first-letter"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
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
