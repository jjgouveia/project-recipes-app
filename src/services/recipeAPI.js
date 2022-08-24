const recipeAPI = async (endpointType, inputText, pathname) => {
  let endpoint = pathname === '/foods'
    ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';

  switch (endpointType) {
  case 'ingredient': endpoint += `filter.php?i=${inputText}`;
    break;
  case 'first-letter': endpoint += `search.php?f=${inputText}`;
    break;
  default: endpoint += `search.php?s=${inputText}`;
    break;
  }

  try {
    const request = await fetch(endpoint);
    const response = await request.json();

    if (pathname === '/foods'
      ? response.meals?.lenght === 0 || response.meals === null
      : response.drinks?.lenght === 0 || response.drinks === null) {
      return (
        global.alert('Sorry, we haven\'t found any recipes for these filters.'),
        {
          meals: [],
          drinks: [],
        });
    }

    return response;
  } catch {
    return {};
  }
};

export default recipeAPI;
