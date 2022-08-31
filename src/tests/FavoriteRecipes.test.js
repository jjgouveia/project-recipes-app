import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Verifica a renderização da tela de receitas concluídas', () => {

beforeEach(() => {
    Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });
}
)

   test('Verifica se o ícone Profile redireciona para a rota /profile', () => {
     const { history } = renderWithRouter(<App />);

     history.push('/favorite-recipes');

     expect(screen.getByRole('img', {  name: /ícone do perfil/i})).toBeInTheDocument();
     userEvent.click(screen.getByRole('img', {  name: /ícone do perfil/i}));

     const pathname = history.location.pathname;

     expect(pathname).toBe('/profile');
   });

   test('Verifica se o título da página é renderizado e os botões de filtro', () => {
     const { history } = renderWithRouter(<App />, 'favorite-recipes');

     history.push('/favorite-recipes');

     expect(screen.getByRole("heading", { name: /favorite recipes/i })).toBeInTheDocument();

     expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
     expect(screen.getByRole("button", { name: /food/i })).toBeInTheDocument();
     expect(screen.getByRole("button", { name: /drinks/i })).toBeInTheDocument();
   });

   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const unlike = screen.getByTestId('0-horizontal-favorite-btn')
     userEvent.click(unlike)
     localStorage.clear()
     localStorage.setItem('favoriteRecipes', JSON.stringify([
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(1);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(1);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(1);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(1);
     const recipe = screen.getByAltText('foto-receita')
     expect(recipe).toBeInTheDocument()
     userEvent.click(recipe)
     const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
    

   });




   test('Verifica se o food, drinks e all funcionam corretamente e o botão compartilhar', () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

    const { history } = renderWithRouter(<App />);

    history.push('/favorite-recipes');

    expect(screen.getByRole('heading', {  name: /favorite recipes/i})).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /food/i }));

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(1);
    expect(screen.getAllByTestId(/horizontal-image/i)[0].src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(1);
    expect(screen.getByRole('heading', {  name: /italian \- vegetarian/i}).innerHTML).toBe('Italian - Vegetarian');

    userEvent.click(screen.getByRole("button", { name: /drinks/i }));

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(1);
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(1);
    expect(screen.getAllByTestId(/horizontal-top-text/i)[0].innerHTML).toBe('Alcoholic');


    userEvent.click(screen.getByRole("button", { name: /all/i }));

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);

   
   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const recipe = screen.getByTestId('0-horizontal-image')
     expect(recipe).toBeInTheDocument()
     userEvent.click(recipe)
     const { pathname } = history.location;
    expect(pathname).toBe('/foods/52771');
    

   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const recipe = screen.getByTestId('0-horizontal-image')
     expect(recipe).toBeInTheDocument()
     userEvent.click(recipe)
     fireEvent.keyDown(recipe, {key: 'A', code: 'KeyA'})
     const { pathname } = history.location;
    expect(pathname).toBe('/foods/52771');
    

   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const recipe = screen.getByTestId('1-horizontal-image')
     expect(recipe).toBeInTheDocument()
     fireEvent.keyDown(recipe, {key: 'A', code: 'KeyA'})
     const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
    

   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const sharebtn1 =  screen.getByTestId('0-horizontal-share-btn')
     expect(sharebtn1).toBeInTheDocument()
     const sharebtn2 =  screen.getByTestId('1-horizontal-share-btn')
     expect(sharebtn2).toBeInTheDocument()
     userEvent.click(sharebtn1)
     userEvent.click(sharebtn2)
     const recipe = screen.getByTestId('1-horizontal-image')
     expect(recipe).toBeInTheDocument()
     userEvent.click(recipe)
     fireEvent.keyDown(recipe, {key: 'A', code: 'KeyA'})
     const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
    const fav2 = screen.getByTestId('1-horizontal-favorite-btn')
    userEvent.click(fav2)
    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(1);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(1);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(1);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(1);
    

   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const recipe = screen.getByTestId('0-horizontal-name')
     expect(recipe).toBeInTheDocument()
     fireEvent.keyDown(recipe, {key: 'A', code: 'KeyA'})
     const { pathname } = history.location;
    expect(pathname).toBe('/foods/52771');
    

   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const recipe = screen.getByTestId('0-horizontal-name')
     expect(recipe).toBeInTheDocument()
     userEvent.click(recipe)
     const { pathname } = history.location;
    expect(pathname).toBe('/foods/52771');
    

   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const recipe = screen.getByTestId('1-horizontal-name')
     expect(recipe).toBeInTheDocument()
     fireEvent.keyDown(recipe, {key: 'A', code: 'KeyA'})
     const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
    

   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     const recipe = screen.getByTestId('1-horizontal-name')
     expect(recipe).toBeInTheDocument()
     userEvent.click(recipe)
     const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
    

   });
   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
   
     
    
    const allbtn = screen.getByTestId('filter-by-all-btn')
    expect(allbtn).toBeInTheDocument()
    userEvent.click(allbtn)
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

    const foodsbtn = screen.getByTestId('filter-by-food-btn')
    expect(foodsbtn).toBeInTheDocument()
    userEvent.click(foodsbtn)
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    }]));

    const drinksbtn = screen.getByTestId('filter-by-drink-btn')
    expect(drinksbtn).toBeInTheDocument()
    userEvent.click(drinksbtn)
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));
    userEvent.click(allbtn)
   
   });

   test('Verifica se os cards de receitas feitas são renderizados', async () => {

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

     const { history } = renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');

     history.push('/favorite-recipes');
   
     
    
    const allbtn = screen.getByTestId('filter-by-all-btn')
    expect(allbtn).toBeInTheDocument()
    userEvent.click(allbtn)
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    },
    {
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));

    const foodsbtn = screen.getByTestId('filter-by-food-btn')
    expect(foodsbtn).toBeInTheDocument()
    userEvent.click(foodsbtn)
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "52771",
        "type": "food",
        "nationality": "Italian",
        "category": "Vegetarian",
        "alcoholicOrNot": "",
        "name": "Spicy Arrabiata Penne",
        "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "doneDate": "",
        "tags": [
            "Pasta,Curry"
        ]
    }]));

    const drinksbtn = screen.getByTestId('filter-by-drink-btn')
    expect(drinksbtn).toBeInTheDocument()
    userEvent.click(drinksbtn)
    localStorage.clear()
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
        "id": "178319",
        "type": "drink",
        "nationality": "",
        "category": "Cocktail",
        "alcoholicOrNot": "Alcoholic",
        "name": "Aquamarine",
        "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        "doneDate": "",
        "tags": [
            null
        ]
    }]));
    const unlike = screen.getByTestId('0-horizontal-favorite-btn')
    userEvent.click(unlike)
    userEvent.click(unlike)

    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
   
   });
});