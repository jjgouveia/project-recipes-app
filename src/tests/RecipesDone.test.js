import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';

describe('Verifica a renderização da tela de receitas concluídas', () => {
   test('Verifica se o ícone Profile redireciona para a rota /profile', () => {
     const { history } = renderWithRouter(<App />);

     history.push('/done-recipes');

     expect(screen.getByRole('img', {  name: /ícone do perfil/i})).toBeInTheDocument();
     userEvent.click(screen.getByRole('img', {  name: /ícone do perfil/i}));

     const pathname = history.location.pathname;

     expect(pathname).toBe('/profile');
   });

   test('Verifica se o título da página é renderizado e os botões de filtro', () => {
     const { history } = renderWithRouter(<App />, 'done-recipes');

     history.push('/done-recipes');

     expect(screen.getByRole("heading", { name: /done recipes/i })).toBeInTheDocument();

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

     const { history } = renderWithRouter(<DoneRecipes />, '/done-recipes');

     history.push('/done-recipes');

     expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-done-date/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-share-btn/i).length).toBe(2);
     expect(screen.getAllByTestId(/horizontal-tag/i).length).toBe(2);
   });


   

   test('Verifica se o food, drinks e all funcionam corretamente e o botão compartilhar', () => {

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

    const { history } = renderWithRouter(<App />);

    history.push('/done-recipes');

    expect(screen.getByRole('heading', {  name: /done recipes/i})).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /food/i }));

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(1);
    expect(screen.getAllByTestId(/horizontal-image/i)[0].src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(1);
    expect(screen.getByRole('heading', {  name: /italian \- vegetarian/i}).innerHTML).toBe('Italian - Vegetarian');

    userEvent.click(screen.getByRole("button", { name: /drinks/i }));

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(1);
    expect(screen.getAllByTestId(/horizontal-image/i)[0].src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(1);
    expect(screen.getAllByTestId(/horizontal-top-text/i)[0].innerHTML).toBe('Alcoholic');


    userEvent.click(screen.getByRole("button", { name: /all/i }));

    expect(screen.getAllByTestId(/horizontal-image/i).length).toBe(2);
    expect(screen.getAllByTestId(/horizontal-top-text/i).length).toBe(2);
   });
   test('Verifica se o food, drinks e all funcionam corretamente e o botão compartilhar', () => {

    Object.assign(navigator, {
        clipboard: {
          writeText: () => {},
        },
      });

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

    const { history } = renderWithRouter(<DoneRecipes />);

    history.push('/done-recipes');

    expect(screen.getAllByText(/compartilhar/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/compartilhar/i)[1]).toBeInTheDocument();

    userEvent.click(screen.getAllByText(/compartilhar/i)[0]);
    userEvent.click(screen.getAllByText(/compartilhar/i)[1]);


   });
   });



//    expect(screen.getByText(/compartilhar/i)).toBeInTheDocument();
// userEvent.click(screen.queryByText(/compartilhar/i));
