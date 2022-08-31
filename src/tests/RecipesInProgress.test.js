import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import {
  mockFoodWithId,
  drinksRecomendation,
  mockDrinkWithId,
  foodsRecomendation,
} from './helpers/mockData';

describe('Testa a renderização e comportamento da página de receitas em progresso', () => {
  beforeEach(() => global.document.execCommand = () => Promise.resolve({})
  )


  afterEach(() => {
    jest.clearAllMocks();
  });

test('Verifica se os detalhes renderizados para uma receita na rota "foods"', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mockFoodWithId)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(drinksRecomendation)
        })
      }
    })

    const { history } = renderWithRouter(<App />);

    history.push('/foods/52771/in-progress');

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'));

    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
    expect(screen.getByTestId('recipe-category').innerHTML).toBe('Vegetarian');
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    const favoriteBtn = screen.getByTestId('favorite-btn')
    expect(favoriteBtn).toBeInTheDocument();
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn.innerHTML).toBe('Finish Recipe');
    expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(8);
    const CHECK_KEY = 'stepsChecked'
    const CHECK_VALUE1 = JSON.stringify(
      {
        "52771":
        {
          "0": true,
          "1": true,
          "2": true,
          "3": true,
          "4": true,
          "5": true,
          "6": true,
          "7": true
        }
      });

    expect(finishBtn).toBeDisabled();
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    userEvent.click(screen.getAllByRole("checkbox")[2]);
    userEvent.click(screen.getAllByRole("checkbox")[3]);
    userEvent.click(screen.getAllByRole("checkbox")[4]);
    userEvent.click(screen.getAllByRole("checkbox")[5]);
    userEvent.click(screen.getAllByRole("checkbox")[6]);
    userEvent.click(screen.getAllByRole("checkbox")[7]);
    expect(finishBtn).toBeEnabled();


    expect(JSON.parse(localStorage.getItem(CHECK_KEY))).toEqual(JSON.parse(CHECK_VALUE1));
    userEvent.click(finishBtn)


  });


test('Verifica se os detalhes renderizados para uma receita na rota "drinks" 1', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mockDrinkWithId)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      }
    })

    const { history } = renderWithRouter(<App />);

    history.push('/drinks/178319/in-progress');

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));

    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Aquamarine');
    expect(screen.getByTestId('recipe-category').innerHTML).toBe('Cocktail');
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    const favBtn = screen.getByTestId('favorite-btn')
    expect(favBtn).toBeInTheDocument();
 
    expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
    expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(3);




    const FAV_KEY = 'favoriteRecipes'
    const AQUAMARINE_VALUE = JSON.stringify([{
      "id": "178319",
      "type": "drink",
      "nationality": "",
      "category": "Cocktail",
      "alcoholicOrNot": "Alcoholic",
      "name": "Aquamarine",
      "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
    },
    ]);

    localStorage.setItem('favoriteRecipes', AQUAMARINE_VALUE);

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual(JSON.parse(AQUAMARINE_VALUE));

    userEvent.click(favBtn);
    console.log(JSON.parse(localStorage.getItem(FAV_KEY)));
    userEvent.click(favBtn);
    expect(JSON.parse(localStorage.getItem(FAV_KEY))).toHaveLength(0)


    const CHECK_KEY = 'stepsChecked'

    localStorage.setItem(CHECK_KEY, JSON.stringify({
      "52771":
      {
        "0": true,
        "1": true,
        "2": true,
        "3": true
      }
    }));


    const CHECK_VALUE1 = JSON.stringify(
      {
        "178319":
        {
          "0": true,
          "1": true,
          "2": true,
        }
      });

      
      userEvent.click(screen.getAllByRole("checkbox")[0]);
      userEvent.click(screen.getAllByRole("checkbox")[1]);
      userEvent.click(screen.getAllByRole("checkbox")[2]);
      
      console.log(localStorage.getItem('stepsChecked'));

      const finishBtn = screen.getByTestId('finish-recipe-btn')
      expect(finishBtn).toBeInTheDocument();

    expect(finishBtn).toBeEnabled();
    expect(JSON.parse(localStorage.getItem(CHECK_KEY))).toEqual(JSON.parse(CHECK_VALUE1))

  });

test('Verifica se os detalhes renderizados para uma receita na rota "drinks" 3', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mockDrinkWithId)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      }
    })

    const { history } = renderWithRouter(<App />);

    history.push('/drinks/178319/in-progress');

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));

    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Aquamarine');
    expect(screen.getByTestId('recipe-category').innerHTML).toBe('Cocktail');
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    const shrBtn = screen.getByTestId('share-btn')
    expect(shrBtn).toBeInTheDocument();
    const favBtn = screen.getByTestId('favorite-btn')
    expect(favBtn).toBeInTheDocument();
    const finishBtn = screen.getByTestId('finish-recipe-btn')
    expect(finishBtn).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
    expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(3);


    userEvent.click(shrBtn)
    expect(await screen.findByText('Link copied!')).toBeInTheDocument()
  });

  test('Verifica se os detalhes renderizados para uma receita na rota "drinks" 4', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mockDrinkWithId)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      }
    })

    const { history } = renderWithRouter(<App />);

    history.push('/drinks/178319/in-progress');

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));

    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Aquamarine');
    expect(screen.getByTestId('recipe-category').innerHTML).toBe('Cocktail');
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    const shrBtn = screen.getByTestId('share-btn')
    expect(shrBtn).toBeInTheDocument();
    const favBtn = screen.getByTestId('favorite-btn')
    expect(favBtn).toBeInTheDocument();
    const finishBtn = screen.getByTestId('finish-recipe-btn')
    expect(finishBtn).toBeInTheDocument();

    expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');

    expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(3);
    // userEvent.click(screen.getAllByRole("checkbox")[0]);
    // userEvent.click(screen.getAllByRole("checkbox")[1]);
    // userEvent.click(screen.getAllByRole("checkbox")[2]);

    userEvent.click(favBtn);
    userEvent.click(favBtn);


    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn)

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');

  });
});
describe('', ()=> {
  test('Verifica se a chave "stepsChecked" é criada novamente no localStorage', async () => {

    fetch = jest.fn().mockImplementation((url) => {
      if (url == 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(mockDrinkWithId)
        })
      } else {
        return Promise.resolve({
          json: jest.fn().mockResolvedValue(foodsRecomendation)
        })
      }
    })

    const { history } = renderWithRouter(<App />);

    history.push('/drinks/178319/in-progress');

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));

    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Aquamarine');
    expect(screen.getByTestId('recipe-category').innerHTML).toBe('Cocktail');
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    const favBtn = screen.getByTestId('favorite-btn')
    expect(favBtn).toBeInTheDocument();
    const finishBtn = screen.getByTestId('finish-recipe-btn')
    expect(finishBtn).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
    expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(3);
    
    const CHECK_KEY = 'stepsChecked'
    const CHECK_VALUE1 = JSON.stringify({
      "178319":
      {
        "0": true,
        "1": true,
        "2": true
      }
    });
    const CHECK_VALUE2 = JSON.stringify({
      "178319":
      {
        "1": true,
        "2": true
      }
    });
    // localStorage.removeItem('stepsChecked');
    userEvent.click(screen.getByTestId('0-ingredient-step'));
    userEvent.click(screen.getByTestId('1-ingredient-step'));
    userEvent.click(screen.getByTestId('2-ingredient-step'));
    
    localStorage.setItem('stepsChecked', false)
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    userEvent.click(screen.getAllByRole("checkbox")[2]);
    userEvent.click(screen.getAllByRole("checkbox")[2]);
    expect(screen.getAllByRole("checkbox")[2]).toHaveAttribute('checked');


  });
})
