import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataProvider from '../context/DataContext';
import Login from '../pages/Login';
import renderWithRouter from './Render With Router/renderWithRouter';

describe('Testando a página de Login', () => {
  it('Verifica se a página renderiza corretamente com seus componentes', () => {
    const { history } = renderWithRouter(
      <DataProvider>
        <Login />
      </DataProvider>,
    );
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnSubmit).toBeEnabled();

    userEvent.click(btnSubmit);
    expect(history.location.pathname).toBe('/meals');
  });
});
