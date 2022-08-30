import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Verifica a renderização da tela de receitas concluídas', () => {
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

   test('Verifica se os cards de receitas feitas são renderizados', () => {

    localStorage.setItem('doneRecipes', JSON.stringify([{
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

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
    expect(screen.getAllByTestId(/horizontal-image/i)[0].src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
    expect(screen.getByRole('heading', {  name: /italian \- vegetarian/i}).innerHTML).toBe('Italian - Vegetarian');

    userEvent.click(screen.getByRole("button", { name: /drinks/i }));

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
    expect(screen.getAllByTestId(/horizontal-top-text/i)[0].innerHTML).toBe('Italian - Vegetarian');


    userEvent.click(screen.getByRole("button", { name: /all/i }));

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);

   
   });
   });