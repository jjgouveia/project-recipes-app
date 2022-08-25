export function setKeys(email) {
  localStorage.setItem('user', JSON.stringify({ email }));
  localStorage.setItem('mealsToken', JSON.stringify(1));
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
}

export function setLocalStorageRecipeObj(recipeObj) {
  localStorage.setItem('doneRecipes', JSON.stringify(recipeObj));
}
