import React from "react";
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe('Testa a função responsável por alimentar a aplicação', ()=> {
    it('Faz uma buscar por ingrediente', async () => {
       const { history } = renderWithRouter(<App />);
       history.push('/foods')
       expect(history.location.pathname).toBe('/foods');

const SEARCH_ICON = screen.getByRole('img', {
    name: /ícone de pesquisa/i
  });

       expect(SEARCH_ICON).toBeInTheDocument();
       userEvent.click(SEARCH_ICON);

       const PLACEHOLDER = screen.getByPlaceholderText(/hmmmmmmmm\.\.\./i);

       expect(PLACEHOLDER).toBeInTheDocument();
       userEvent.type(PLACEHOLDER, 'tomato')

       userEvent.click(screen.getByText(/ingredient/i));
       userEvent.click(screen.getByTestId('exec-search-btn'));

  

    });


    it('Testa se, encontrado um único item, é levado para a página de detalhes', async () => {
     await act(async() => renderWithRouter(<App />))
     
     const { history } = renderWithRouter(<App />);
      history.push('/drinks')
      expect(history.location.pathname).toBe('/drinks');

      expect(screen.getByRole('heading', {
        name: /drinks/i
      })).toBeInTheDocument();


      const SEARCH_ICON = screen.getByRole('img', {
          name: /ícone de pesquisa/i
        });

        expect(SEARCH_ICON).toBeInTheDocument();
userEvent.click(SEARCH_ICON);

const PLACEHOLDER = screen.getByPlaceholderText(/hmmmmmmmm\.\.\./i);

expect(PLACEHOLDER).toBeInTheDocument();
userEvent.type(PLACEHOLDER, 'Aquamarine')

userEvent.click(screen.getByText(/name/i));
userEvent.click(screen.getByTestId('exec-search-btn'));

waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'))



      
   

   })

    it('Testa se, encontrado um único item, é levado para a página de detalhes', async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks')
        expect(history.location.pathname).toBe('/drinks');

        expect(screen.getByRole('heading', {
          name: /drinks/i
        })).toBeInTheDocument();

        localStorage.removeItem('inProgressRecipes');
        console.log('====================================');
        console.log(localStorage.getItem('inProgressRecipes'));
        window.location.reload();
        console.log('====================================');
        console.log(localStorage.getItem('inProgressRecipes'));

     })


})


