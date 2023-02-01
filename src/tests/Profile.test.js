import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import DataProvider from '../context/DataContext';
import renderWithRouter from './Render With Router/renderWithRouter';
import App from '../App';
import { saveItem } from '../components/localStorage';

describe('Profile', () => {
  it('verifica se a página renderiza corretamente e seus componentes', () => {
    saveItem('user', { email: 'email@mail.com' });
    const { history } = renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    act(() => history.push('/profile'));

    const profileBtn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const userEmail = screen.getByTestId('profile-email');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(userEmail).toHaveTextContent('email@mail.com');

    userEvent.click(favoBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('verifica se é feito o logout', () => {
    const { history } = renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    act(() => history.push('/profile'));

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
  it('verifica se é redirecionado para done recipes', () => {
    const { history } = renderWithRouter(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    act(() => history.push('/profile'));

    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
