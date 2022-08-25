export const apiCategoryFood = async () => {
  const endpointFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const reponse = await fetch(endpointFood);
  const date = await reponse.json();

  return date;
};

export const apiCategoryDrinks = async () => {
  const endpointDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const reponse = await fetch(endpointDrinks);
  const date = await reponse.json();

  return date;
};
