export default function saveKeys() {
  if (!localStorage.getItem('user')) localStorage.setItem('user', '');
  if (!localStorage.getItem('mealsToken')) localStorage.setItem('mealsToken', '');
  if (!localStorage
    .getItem('cocktailsToken')) localStorage.setItem('cocktailsToken', '');
  if (!localStorage
    .getItem('doneRecipes')) localStorage.setItem('doneRecipes', []);
  if (!localStorage
    .getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }
  if (!localStorage
    .getItem('favoriteRecipes')) localStorage.setItem('favoriteRecipes', []);
}
