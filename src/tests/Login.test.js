import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
const saveKeys = require('../services/setKeys')

describe('Testa a página de Login e seu comportamento', ()=> {
  it('Testa se existe um elemento com o título "Login" na tela', () => {
      render(<App />);
      const linkElement = screen.getByRole('heading', {
        name: /login/i,
        level: 1,
      });
      expect(linkElement).toBeInTheDocument();
    });
    it('Testa se é possível digitar no campo de email e senha ', () => {
      render(<App/>);
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
      render(<App/>);
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

