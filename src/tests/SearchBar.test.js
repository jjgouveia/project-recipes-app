import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import renderWithRouter from  './helpers/renderWithRouter';

describe('Testa as funcionalidades do componente "SearchBar"', () => {

beforeEach(() => {
    global.alert = jest.fn();
});


it('Teste se é possivel digitar nos campos de busca, selecionar os inputs e clicar no botão de busca', async () => {
    renderWithRouter(<SearchBar />, '/foods');

    const SEARCH_INPUT = screen.getByTestId("search-input");
    userEvent.type(SEARCH_INPUT, 'lasagna');
    expect(SEARCH_INPUT).toHaveValue('lasagna');

    const NAME = screen.getByLabelText(/name/i);
    userEvent.click(NAME);

    const BTN = screen.getByTestId("exec-search-btn");
    userEvent.click(BTN);
});
it('Teste se, digitado um termo maior que uma letra como filtro "First Letter", é retornado um alert', () => {
    renderWithRouter(<SearchBar />, '/foods');

    const SEARCH_INPUT = screen.getByTestId("search-input");
    
    userEvent.type(SEARCH_INPUT, 'la');
    expect(SEARCH_INPUT).toHaveValue('la');

    const NAME = screen.getByLabelText(/first letter/i);
    userEvent.click(NAME);

    const BTN = screen.getByTestId("exec-search-btn");
    userEvent.click(BTN);

    //expect
});
it('Teste se, quando encontrado somente um item na busca, é retornado um alert', () => {
    renderWithRouter(<SearchBar />, '/foods');

    const SEARCH_INPUT = screen.getByTestId("search-input");
    
    userEvent.type(SEARCH_INPUT, 'petitgateau');
    expect(SEARCH_INPUT).toHaveValue('petitgateau');

    const NAME = screen.getByLabelText(/name/i);
    userEvent.click(NAME);

    const BTN = screen.getByTestId("exec-search-btn");
    userEvent.click(BTN);

    //expect
});

it('Verifica se o fetch é chamado com o endpoint correto na página '
+ '"Foods"', async () => {

   

  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=myMeal';

  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({}),
  });

  const { history } = renderWithRouter(<Header />, '/foods');
  history.push('/foods')

  userEvent.click(screen.getByTestId('search-top-btn'));
  userEvent.type(screen.getByTestId('search-input'), 'myMeal');
  userEvent.click(screen.getByTestId('name-search-radio'));
  userEvent.click(screen.getByTestId('exec-search-btn'));

  await waitFor(() => expect(fetch).toHaveBeenCalled());
  expect(fetch).toHaveBeenCalledWith(endpoint);
});

});