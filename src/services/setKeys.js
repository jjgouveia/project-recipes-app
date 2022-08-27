export function setKeys(email) {
  localStorage.setItem('user', JSON.stringify({ email }));
  localStorage.setItem('mealsToken', JSON.stringify(1));
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
}

export function setLocalStorageRecipeObj(recipeObj) {
  let existingEntries = localStorage
    .getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  if (!existingEntries) existingEntries = [];
  existingEntries.push(recipeObj);
  localStorage.setItem('doneRecipes', JSON.stringify(existingEntries));
  // localStorage.setItem('doneRecipes', JSON.stringify(recipeObj));
}

export function setLoStoInProgress(recipes) {
  // console.log(recipes);
  // const existingEntries = localStorage
  //   .getItem('inProgressRecipes')
  //   ? JSON.parse(localStorage.getItem('inProgressRecipes')) : [];
  // // if (!existingEntries) existingEntries = {};
  // // console.log(existingEntries);
  // // existingEntries.push(recipes);
  localStorage.setItem('inProgressRecipes', recipes);
}

export function setLocalStorageFavorite(fav) {
  let existingEntries = localStorage
    .getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  if (!existingEntries) existingEntries = [];
  existingEntries.push(fav);
  localStorage.setItem('favoriteRecipes', JSON.stringify(existingEntries));
}
