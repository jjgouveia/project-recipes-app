import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter'

describe('Testa a página de Login e seu comportamento', ()=> {
  it('Testa se existe um elemento com o título "Login" na tela', () => {
      renderWithRouter(<App />);
      const linkElement = screen.getByRole('heading', {
        name: /login/i,
        level: 1,
      });
      expect(linkElement).toBeInTheDocument();
    });
    it('Testa se é possível digitar no campo de email e senha ', () => {
      renderWithRouter(<App/>);
      const EMAIL = screen.getByTestId('email-input');
      userEvent.type(EMAIL, 'teste@teste.com');
      expect(EMAIL).toHaveDisplayValue('teste@teste.com')

      const BTN = screen.getByRole('button', {
        name: /entrar/i
      });

      expect(BTN).toBeDisabled();

      const PASSWORD = screen.getByTestId('password-input');
      userEvent.type(PASSWORD, '1234567')
      expect(PASSWORD).toHaveDisplayValue('1234567');

      expect(BTN).toBeEnabled();
    });
    it('Testa se é possível fazer login na página', () => {
      renderWithRouter(<App/>);
      const EMAIL = screen.getByTestId('email-input');
      userEvent.type(EMAIL, 'teste@teste.com');
      expect(EMAIL).toHaveDisplayValue('teste@teste.com')

      const BTN = screen.getByRole('button', {
        name: /entrar/i
      });

      const PASSWORD = screen.getByTestId('password-input');

      userEvent.type(PASSWORD, '1234567')
      expect(PASSWORD).toHaveDisplayValue('1234567');

      expect(BTN).not.toBeDisabled();

      userEvent.click(BTN);

    });
  });

