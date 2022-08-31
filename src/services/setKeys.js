export function setKeys(email) {
  localStorage.setItem('user', JSON.stringify({ email }));
  localStorage.setItem('mealsToken', JSON.stringify(1));
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
}

export function setLocalStorageRecipeObj(recipeObj) {
  const existingEntries = localStorage
    .getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  // if (!existingEntries) existingEntries = [];
  existingEntries.push(recipeObj);
  localStorage.setItem('doneRecipes', JSON.stringify(existingEntries));
}

export function setLocalStorageFavorite(fav) {
  const existingEntries = localStorage
    .getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  // if (!existingEntries) existingEntries = [];
  existingEntries.push(fav);
  localStorage.setItem('favoriteRecipes', JSON.stringify(existingEntries));
}
