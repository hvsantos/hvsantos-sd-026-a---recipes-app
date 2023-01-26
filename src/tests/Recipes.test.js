import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Recipes from '../pages/Recipes';
import meals from '../../cypress/mocks/meals';
import mealCategories from './mocks/mealCategory';
import DataProvider from '../context/DataContext';
// import Login from '../pages/Login';

describe('Testando a página de Recipes', () => {
  it('Verifica se a página renderiza corretamente com seus componentes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValueOnce(meals),
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValueOnce(mealCategories),
    });

    await act(() => render(
      <DataProvider>
        <Recipes path="meals" />
      </DataProvider>,
    ));

    // const { history } = render(<Login />);
    // const emailInput = screen.findByTestId('email-input');
    // const passwordInput = screen.findByTestId('password-input');
    // const btnSubmit = screen.findByTestId('login-submit-btn');

    // expect(emailInput).toBeInTheDocument();
    // expect(passwordInput).toBeInTheDocument();
    // expect(btnSubmit).toBeInTheDocument();
    // expect(btnSubmit).toBeDisabled();

    // userEvent.type(emailInput, 'test@test.com');
    // userEvent.type(passwordInput, '1234567');
    // expect(btnSubmit).toBeEnabled();

    // userEvent.click(btnSubmit);
    // expect(history.location.pathname).toBe('/meals');

    // await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    // expect(global.fetch).toHaveBeenCalled();
    // const filter0 = screen.findByRole('button', {
    //   name: /beef/i,
    // });
    // const filter1 = screen.findByTestId('Breakfast-category-filter');
    // const filter2 = screen.findByTestId('Chicken-category-filter');
    // const filter3 = screen.findByTestId('Dessert-category-filter');
    // const filter4 = screen.findByTestId('Goat-category-filter');
    // const filter0 = screen.getByTestId('Ordinary Drink-category-filter');
    // const filter1 = screen.getByTestId('Cocktail-category-filter');
    // const filter2 = screen.getByTestId('Shake-category-filter');
    // const filter3 = screen.getByTestId('Other / Unknown-category-filter');
    // const filter4 = screen.getByTestId('Cocoa-category-filter');

    expect(filter0).toBeInTheDocument();
    expect(filter1).toBeInTheDocument();
    expect(filter2).toBeInTheDocument();
    expect(filter3).toBeInTheDocument();
    expect(filter4).toBeInTheDocument();
  });
});
