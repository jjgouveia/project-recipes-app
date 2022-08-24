import React from "react";
import renderWithRouter from './helpers/renderWithRouter'
import userEvent from '@testing-library/user-event'
import {screen } from "@testing-library/react";
import Header from "../components/Header";

describe('Componente Header', () => { 
    it('Verifica o comportamento do botão e da barra de pesquisa', () => {
        renderWithRouter(<Header />, '/foods');
    
        const SEARCH_BTN = screen.getByRole('img', {
          name: /ícone de pesquisa/i
        });

        userEvent.click(SEARCH_BTN);
    
        const SEARCH_BAR = screen.getByTestId('search-input');
        expect(SEARCH_BAR).toBeInTheDocument();

        userEvent.click(SEARCH_BTN);
        expect(SEARCH_BAR).not.toBeInTheDocument();
      });
 })