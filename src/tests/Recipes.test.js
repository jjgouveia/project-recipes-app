import React from 'react';
import { screen } from '@testing-library/react';
import Recipes from '../components/Recipes';
import renderWithRouter from './helpers/renderWithRouter'

describe('Testando o component Recipes', () => {
    beforeEach(() => {
        global.alert = jest.fn();
    });
    
    it('Verificando os bottons na tela', () => {
        renderWithRouter(<Recipes />, '/foods');
        const buttons = screen.getByRole('button', {name: /beef/i})
        expect(buttons).toBeInTheDocument()
    }) 

})