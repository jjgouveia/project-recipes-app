import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import drinks from "../../cypress/mocks/drinks";
import meals from "../../cypress/mocks/meals";
import beefMeals from "../../cypress/mocks/beefMeals";
import cocoaDrinks from "../../cypress/mocks/cocoaDrinks";
import mealCategories from "../../cypress/mocks/mealCategories";
import drinkCategories from "../../cypress/mocks/drinkCategories";
import App from '../App';
import renderWithRouter from "./helpers/renderWithRouter";
import { act } from "react-dom/test-utils";



describe('testa Recipes', () => {

  afterEach(() => {
    jest.clearAllMocks();
});
  
test('se os botoes aparecem na pagina', async () => {
    await act(async () => renderWithRouter(<App />));
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(await screen.findByTestId('Beef-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Goat-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('All-category-filter')).toBeInTheDocument();
  });


 
test('testa recipes foods', async () => {
  await act(async () => renderWithRouter(<App />, '/foods'))
  const { history } = renderWithRouter(<App/>);
  history.push('/foods')

  const Corba = await screen.findByText('Corba') ;
  expect(Corba).toBeInTheDocument();
  userEvent.click(Corba);
  await waitFor(() => expect(history.location.pathname).toBe('/foods/52977'));
  
})
test('testa recipes foods', async () => {
  await act(async () => renderWithRouter(<App />, '/foods'))

  const { history } = renderWithRouter(<App />)
  history.push('/foods')

  const all = await screen.findByTestId('All-category-filter');

  userEvent.click(all);

  const Corba = await screen.findByText('Corba') ;
  expect(Corba).toBeInTheDocument();

})

test('testa recipes drinks', async () => {
  await act(async () => renderWithRouter(<App />, '/drinks'))

  const { history } = renderWithRouter(<App />)
  history.push('/drinks')

  const drinkGG = await screen.findByText('GG') ;
  expect(drinkGG).toBeInTheDocument();
  userEvent.click(drinkGG);
  await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997'));

})
test('se ao clicar no filtro beef muda as receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    await act(async () => renderWithRouter(<App />, '/foods'))

    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const beefFilter = screen.getByTestId('Beef-category-filter');
    expect(beefFilter).toBeInTheDocument();

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    userEvent.click(beefFilter);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const beefWellington = screen.getByRole('heading', { name: /Beef Wellington/i });
    expect(beefWellington).toBeInTheDocument();
    expect(screen.queryByText(/corba/i)).not.toBeInTheDocument();
  });
  test('se ao clicar no filtro cocoa muda as receitas para chocolate', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });  
    await act(async () => renderWithRouter(<App />, '/foods'))

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const cocoaFilter = screen.getByTestId('Cocoa-category-filter');
    expect(cocoaFilter).toBeInTheDocument();

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(cocoaDrinks),
    });

    userEvent.click(cocoaFilter);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const chocolateBeve = screen.getByRole('heading', { name: /Chocolate Beverage/i });
    expect(chocolateBeve).toBeInTheDocument();
    expect(screen.queryByText(/GG/i)).not.toBeInTheDocument();
  });
  test('se ao clicar no all volta as receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const allRecipesBtn = screen.getByTestId('All-category-filter');
    const cocoaFilter = screen.getByTestId('Cocoa-category-filter');
    expect(cocoaFilter).toBeInTheDocument();

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(cocoaDrinks),
    });

    userEvent.click(cocoaFilter);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    userEvent.click(allRecipesBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const ggDrink = screen.getByRole('heading', { name: /gg/i });
    expect(ggDrink).toBeInTheDocument();
  
  });
  test('se ao clicar no filtro (drinks) mais de uma vez reseta as receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const cocoaFilter = screen.getByTestId('Cocoa-category-filter');
    expect(cocoaFilter).toBeInTheDocument();

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(cocoaDrinks),
    });

    userEvent.click(cocoaFilter);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    userEvent.click(cocoaFilter);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const ggDrink = screen.getByRole('heading', { name: /gg/i });
    expect(ggDrink).toBeInTheDocument();
  
  });
  test('se ao clicar no filtro mais de uma vez (foods) reseta as receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const beefFilter = screen.getByTestId('Beef-category-filter');
    expect(beefFilter).toBeInTheDocument();

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    userEvent.click(beefFilter);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    userEvent.click(beefFilter);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const corba = screen.getByRole('heading', { name: /corba/i });
    expect(corba).toBeInTheDocument();
  
  });

})
