export default function saveKeys() {
  if (!localStorage.getItem('user')) localStorage.setItem('user', '');
  if (!localStorage.getItem('mealsToken')) localStorage.setItem('mealsToken', '');
  if (!localStorage
    .getItem('cocktailsToken')) localStorage.setItem('cocktailsToken', '');
}
