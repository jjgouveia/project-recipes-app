const getFoodAPI = async (endpointType, inputText) => {
  let endpoint = '';

  if (endpointType === 'ingredient') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`;
  }
  if (endpointType === 'name') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
  }
  if (endpointType === 'first-letter') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`;
  }

  const request = await fetch(endpoint);
  const response = await request.json();
  return response;
};

export default getFoodAPI;
