import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import SearchBar from '../components/SearchBar';
import renderWithRouter from  './helpers/renderWithRouter';

describe('Testa as funcionalidades do componente "SearchBar"', () => {
it('Teste se é possivel digitar nos campos de busca, selecionar os inputs e clicar no botão de busca', async () => {
    const { history } =  renderWithRouter(<SearchBar />);
    history.push('/foods')

    const SEARCH_INPUT = screen.getByTestId("search-input");
    userEvent.type(SEARCH_INPUT, 'lasagna');
    expect(SEARCH_INPUT).toHaveValue('lasagna');

    const NAME = screen.getByLabelText(/name/i);
    userEvent.click(NAME);

    const BTN = screen.getByTestId("exec-search-btn");
    userEvent.click(BTN);
});
it('Teste se, digitado um termo maior que uma letra como filtro "First Letter", é retornado um alert', () => {
    const {history} = renderWithRouter(<SearchBar />);
    history.push('/foods')

    global.alert = jest.fn();

    const SEARCH_INPUT = screen.getByTestId("search-input");
    
    userEvent.type(SEARCH_INPUT, 'la');
    expect(SEARCH_INPUT).toHaveValue('la');

    const NAME = screen.getByLabelText(/first letter/i);
    userEvent.click(NAME);

    const BTN = screen.getByTestId("exec-search-btn");
    userEvent.click(BTN);

    //expect
});
it('Teste se, digitado um termo maior que uma letra como filtro "First Letter", é retornado um alert', () => {
    const {history} = renderWithRouter(<SearchBar />);
    history.push('/foods')

    const SEARCH_INPUT = screen.getByTestId("search-input");
    
    userEvent.type(SEARCH_INPUT, 'petitgateau');
    expect(SEARCH_INPUT).toHaveValue('petitgateau');

    const NAME = screen.getByLabelText(/name/i);
    userEvent.click(NAME);

    const BTN = screen.getByTestId("exec-search-btn");
    userEvent.click(BTN);

    //expect
});

});