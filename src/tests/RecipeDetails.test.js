import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Foods from '../pages/Foods';
import {
    mockFoodWithId,
    drinksRecomendation,
    mockDrinkWithId,
    foodsRecomendation } from './helpers/mockData';
import { act } from 'react-dom/test-utils';

describe('Verifica renderização  da página de detalhes de bebid', () => {
    test('Verifica se os detalhes renderizados para uma receita de drink', async () => {
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
  
      history.push('/drinks/178319');
  
      await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));
      await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  
    //   expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    //   expect(screen.getByTestId('recipe-title').innerHTML).toBe('Aquamarine');
    //   expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    //   expect(screen.getAllByTestId(/ingredient-name-and-measure/i).length).toBe(3);
    //   expect(screen.getByTestId('instructions')).toBeInTheDocument();
    //   // expect(screen.getByTestId('video')).toBeInTheDocument();
    //   expect(screen.getAllByTestId(/recomendation-card/i).length).toBe(6);
      });
    });

describe('Verifica renderização da página de detalhes de Comida', () => {
    beforeEach(() => {
        fetch = jest.fn().mockImplementation((url) => {
            if (url == 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52844') {
              return Promise.resolve({
                json: jest.fn().mockResolvedValue(mockFoodWithId)
              })
            } else {
              return Promise.resolve({
                json: jest.fn().mockResolvedValue(drinksRecomendation)
              })
            }
          });

          Object.assign(navigator, {
            clipboard: {
              writeText: () => {},
            },
          });
    });
    afterEach(() => jest.clearAllMocks());
  it('Verifica se os detalhes renderizados para uma receita de comida', async () => {

  const { history } = renderWithRouter(<App />);

  history.push('/foods/52844');

  await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52844'));
  await waitFor(() => expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

  expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
  expect(screen.getByTestId('recipe-category').innerHTML).toBe('Vegetarian');
  expect(screen.getAllByTestId(/ingredient-name-and-measure/i).length).toBe(8);
  expect(screen.getByTestId('instructions')).toBeInTheDocument();
  expect(screen.getByTestId('video')).toBeInTheDocument();
  expect(screen.getAllByTestId(/recomendation-card/i).length).toBe(6);
  });

  it('Verifica se é possível marcar e desmascar o botão de favoritos', async ()  => {

    await act(async () => renderWithRouter(<App />))

    const { history } = renderWithRouter(<App />);

    history.push('/foods/52844');

    await waitFor(() => expect(fetch).toBeCalled());
    await waitFor(() => expect(fetch).toBeCalled());

    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('favorite-btn'));
  });
  it('Verifica o comportamento do botão de comportilhar', async ()  => {

    await act(async () => renderWithRouter(<App />, '/foods/52844'))

    const { history } = renderWithRouter(<App />);

    history.push('/foods/52844');

    await waitFor(() => expect(fetch).toBeCalled());
    await waitFor(() => expect(fetch).toBeCalled());

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    jest.spyOn(navigator.clipboard, 'writeText');

    userEvent.click(screen.getByTestId('share-btn'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('Verifica se é gerada uma chave no localStorage caso não exista', async ()  => {
    const { history } = renderWithRouter(<App />);



    
    history.push('/foods/52844');
    
    await waitFor(() => expect(fetch).toBeCalled());
    await waitFor(() => expect(fetch).toBeCalled());

    history.push('/foods/52844');

    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();

  });

  it('Verifica o comportamento ao clicar no botão "Start Recipe"', async ()  => {


//    renderWithRouter(<App />);


    const { history } = renderWithRouter(<App />);

    history.push('/foods/52844');
    
    await waitFor(() => expect(fetch).toBeCalled());
    await waitFor(() => expect(fetch).toBeCalled());
    

    const oldRecipe = JSON.stringify({
        meals: {
          '53026': [
            'Broad Beans',
            'Spring Onions',
            'Garlic Clove',
            'Parsley',
            'Cumin',
            'Baking Powder',
            'Cayenne Pepper',
            'Flour',
            'Vegetable Oil'
          ]
        }
      });

      localStorage.setItem('inProgressRecipes', oldRecipe);

    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('start-recipe-btn'));
  });
  it('Verifica o comportamento ao clicar no botão "Continuar Receita"', async ()  => {
        const { history } = renderWithRouter(<App />);

        const oldRecipe = JSON.stringify({
            meals: {
              '52844': [
                'Olive Oil',
                'Bacon',
                'Spring Onions',
                'chopped tomatoes',
                'red chile flakes',
                'italian seasoning',
                'basil',
                'Parmigiano-Reggiano'
              ]
            }
          });
    
          localStorage.setItem('inProgressRecipes', oldRecipe);
    
        history.push('/foods/52844');
        
        await waitFor(() => expect(fetch).toBeCalled());
        await waitFor(() => expect(fetch).toBeCalled());
    
        expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
        expect(screen.getByRole('button', {  name: /continue recipe/i})).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', {  name: /continue recipe/i}));
      });

      it('Verifica se não existe botão de iniciar ou continuar receita caso ela já tenha sido finalizada"', async ()  => {
        const { history } = renderWithRouter(<App />);

        const doneRecipe = JSON.stringify([{
            "id": "52844",
            "type": "food",
            "nationality": "Italian",
            "category": "Pasta",
            "alcoholicOrNot": "",
            "name": "Lasagne",
            "image": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
            "doneDate": "",
            "tags": [
                null
            ]
        }]);
    
          localStorage.setItem('doneRecipes', doneRecipe);
    
        history.push('/foods/52844');
        
        await waitFor(() => expect(fetch).toBeCalled());
        await waitFor(() => expect(fetch).toBeCalled());
      });
      it('Verifica se não existe botão de iniciar ou continuar receita caso ela já tenha sido finalizada"', async ()  => {
        const { history } = renderWithRouter(<App />);

        const favorites = JSON.stringify([{
            "id": "52844",
            "type": "food",
            "nationality": "Italian",
            "category": "Pasta",
            "alcoholicOrNot": "",
            "name": "Lasagne",
            "image": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg"
        }]);
    
          localStorage.setItem('favoriteRecipes', favorites);
    
        history.push('/foods/52844');
        
        await waitFor(() => expect(fetch).toBeCalled());
        await waitFor(() => expect(fetch).toBeCalled());
      });
})



