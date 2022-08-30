import React from 'react';
import { getByText, screen, waitFor } from '@testing-library/react';
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

  const { history } = rendeWithRouter(<App />);

  history.push('/foods/52771/in-progress');

  await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'));

  expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
  expect(screen.getByTestId('recipe-category').innerHTML).toBe('Vegetarian');
  expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
  expect(screen.getByTestId('instructions')).toBeInTheDocument();
  expect(screen.getByTestId('share-btn')).toBeInTheDocument();
  const finishBtn = screen.getByTestId('favorite-btn')
  expect(finishBtn).toBeInTheDocument();
  expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
  expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(8);
  const CHECK_KEY = 'stepsChecked'
  const CHECK_VALUE1 = JSON.stringify(
  {"52771":
  {"0":true,
  "1":true,
  "2":true,
  "3":true
  }});
  userEvent.click(screen.getAllByRole("checkbox")[0]);
  userEvent.click(screen.getAllByRole("checkbox")[1]);
  userEvent.click(screen.getAllByRole("checkbox")[2]);
  userEvent.click(screen.getAllByRole("checkbox")[3]);
  expect(JSON.parse(localStorage.getItem(CHECK_KEY))).toEqual(JSON.parse(CHECK_VALUE1))
  userEvent.click(finishBtn)
  
  
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
    const favBtn = screen.getByTestId('favorite-btn')
    expect(favBtn).toBeInTheDocument();
    const finishBtn = screen.getByTestId('favorite-btn')
    expect(finishBtn).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
    expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(3);
  
    
    

    const FAV_KEY = 'favoriteRecipes'
    const AQUAMARINE_VALUE = JSON.stringify([{
        alcoholicOrNot: "Alcoholic",
        category: "Cocktail",
        id: "178319",
        image: "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        name: "Aquamarine",
        nationality: "",
        type: "drink", }]);



      
      userEvent.click(favBtn);
      expect(JSON.parse(localStorage.getItem(FAV_KEY))).toEqual(JSON.parse(AQUAMARINE_VALUE))
      
      userEvent.click(favBtn);
      console.log(JSON.parse(localStorage.getItem(FAV_KEY)));
      expect(JSON.parse(localStorage.getItem(FAV_KEY))).toHaveLength(0)
      const CHECK_KEY = 'stepsChecked'
      const CHECK_VALUE1 = JSON.stringify({"178319":
      {"0":true,
      "1":true,
      "2":true,
      }},
      {"52771":
      {"0":true,
      "1":true,
      "2":true,
      "3":true
      }});
      userEvent.click(screen.getAllByRole("checkbox")[0]);
      userEvent.click(screen.getAllByRole("checkbox")[1]);
      userEvent.click(screen.getAllByRole("checkbox")[2]);
      expect(JSON.parse(localStorage.getItem(CHECK_KEY))).toEqual(JSON.parse(CHECK_VALUE1))
      
      
    
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
      const favBtn = screen.getByTestId('favorite-btn')
      expect(favBtn).toBeInTheDocument();
      const finishBtn = screen.getByTestId('finish-recipe-btn')
      expect(finishBtn).toBeInTheDocument();
      expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
      expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(3);
      localStorage.clear()
      const CHECK_KEY = 'stepsChecked'
      const CHECK_VALUE1 = JSON.stringify({"178319":
      {"0":true,
      "1":true,
      "2":true}});
      const CHECK_VALUE2 = JSON.stringify({"178319":
      {"1":true,
      "2":true}});
      localStorage.setItem(CHECK_KEY, CHECK_VALUE1);
        userEvent.click(screen.getByTestId('0-ingredient-step'));
        userEvent.click(screen.getByTestId('1-ingredient-step'));
        userEvent.click(screen.getByTestId('2-ingredient-step'));
        userEvent.click(finishBtn)
          const { pathname } = history.location;
          expect(pathname).toBe('/done-recipes');
        console.log(JSON.parse(localStorage.getItem(CHECK_KEY)));
        expect(JSON.parse(localStorage.getItem(CHECK_KEY))).toEqual(JSON.parse(CHECK_VALUE1))
        localStorage.clear()
        localStorage.setItem(CHECK_KEY, CHECK_VALUE2);
        userEvent.click(screen.getByTestId('0-ingredient-step'));
        userEvent.click(screen.getByTestId('1-ingredient-step'));
        userEvent.click(screen.getByTestId('2-ingredient-step'));
        userEvent.click(screen.getByTestId('0-ingredient-step'));
        expect(JSON.parse(localStorage.getItem(CHECK_KEY))).toEqual(JSON.parse(CHECK_VALUE2))

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
          const shrBtn = screen.getByTestId('share-btn')
          expect(shrBtn).toBeInTheDocument();
          const favBtn = screen.getByTestId('favorite-btn')
          expect(favBtn).toBeInTheDocument();
          const finishBtn = screen.getByTestId('finish-recipe-btn')
          expect(finishBtn).toBeInTheDocument();
          expect(screen.getByTestId('finish-recipe-btn').innerHTML).toBe('Finish Recipe');
          expect(screen.getAllByTestId(/ingredient-step/i).length).toBe(3);
          userEvent.click(screen.getByTestId('0-ingredient-step'));
          userEvent.click(screen.getByTestId('1-ingredient-step'));
          userEvent.click(screen.getByTestId('2-ingredient-step'));
          
          userEvent.click(finishBtn)
          const { pathname } = history.location;
          expect(pathname).toBe('/done-recipes');
          
        });

});
