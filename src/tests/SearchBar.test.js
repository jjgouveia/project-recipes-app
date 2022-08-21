import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import renderWithRouter from  './helpers/renderWithRouter';

describe('Testa as funcionalidades do componente "SearchBar"', () => {
it('Teste se é possivel fazer digitar nos campos de busca, selecionar os inputs e clicar no botão de busca', () => {
    const {history} = renderWithRouter(<SearchBar />);
    history.push('/foods')

    const SEARCH_INPUT = screen.getByTestId("search-input");
    userEvent.type(SEARCH_INPUT, 'lasagna');
    expect(SEARCH_INPUT).toHaveValue('lasagna');

    const NAME = screen.getByLabelText(/name/i);
    userEvent.click(NAME);

    const BTN = screen.getByTestId("exec-search-btn");
    userEvent.click(BTN);
});
});