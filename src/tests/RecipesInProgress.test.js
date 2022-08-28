import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';
import {
    mockFoodWithId,
    drinksRecomendation,
    mockDrinkWithId,
    foodsRecomendation,
   } from './helpers/mockData';

describe('Testa a renderização e comportamento da página de receitas em progresso', () => {

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

  const { history } = rendeWithRouter(<App />);

  history.push('/foods/52771/in-progress');

  await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'));

  expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
  expect(screen.getByTestId('recipe-category').innerHTML).toBe('Vegetarian');
  expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
  expect(screen.getByTestId('instructions')).toBeInTheDocument();
  expect(screen.getByTestId('share-btn')).toBeInTheDocument();
  expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
  expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
  expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(8);

  userEvent.click(screen.getAllByRole("checkbox")[0]);
  userEvent.click(screen.getAllByRole("checkbox")[1]);
  userEvent.click(screen.getAllByRole("checkbox")[2]);
  userEvent.click(screen.getAllByRole("checkbox")[3]);
  });


  test('Verifica se os detalhes renderizados para uma receita na rota "drinks"', async () => {

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
  
    const { history } = rendeWithRouter(<App />);
  
    history.push('/drinks/178319/in-progress');
  
    await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));
  
    expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Aquamarine');
    expect(screen.getByTestId('recipe-category').innerHTML).toBe('Cocktail');
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
    expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(3);
  
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    userEvent.click(screen.getAllByRole("checkbox")[2]);
    });
});
