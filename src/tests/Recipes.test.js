// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import Recipes from '../pages/Recipes';
// import meals from '../../cypress/mocks/meals';
// import mealCategories from './mocks/mealCategory';
// import DataProvider from '../context/DataContext';
// import App from '../App';
// import renderWithRouter from './Render With Router/renderWithRouter';
// import mockFetch from './mockFetch';
// import Login from '../pages/Login';

describe('Testando a página de Recipes', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  //   jest.spyOn(global, 'alert').mockImplementation(() => {});
  // });
  // it('Verifica se a página renderiza corretamente com seus componentes', async () => {
  //   // jest.spyOn(global, 'fetch');
  //   // global.fetch.mockResolvedValue({
  //   //   json: jest.fn().mockReturnValueOnce(mealCategories),
  //   // });

  //   const { history } = renderWithRouter(
  //     <DataProvider>
  //       <App />
  //     </DataProvider>,
  //   );

  //   act(() => {
  //     history.push('/meals');
  //   });

  //   // history.push('/meals');
  //   // console.log(history.location.pathname);

  //   expect(global.fetch).toHaveBeenCalled(2);

  //   await waitFor(() => {
  //     expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
  //   });

  //   // expect(global.fetch).toHaveBeenCalled();
  //   // const filter0 = screen.findByRole('button', {
  //   //   name: /beef/i,
  //   // });
  //   const filter1 = screen.getByTestId('Breakfast-category-filter');
  //   const filter2 = screen.findByTestId('Chicken-category-filter');
  //   const filter3 = screen.findByTestId('Dessert-category-filter');
  //   const filter4 = screen.findByTestId('Goat-category-filter');
  //   const filter0 = screen.findByTestId('Ordinary Drink-category-filter');
  //   // const filter1 = screen.getByTestId('Cocktail-category-filter');
  //   // const filter2 = screen.getByTestId('Shake-category-filter');
  //   // const filter3 = screen.getByTestId('Other / Unknown-category-filter');
  //   // const filter4 = screen.getByTestId('Cocoa-category-filter');
  //   console.log(filter1);
  //   expect(filter0).toBeInTheDocument();
  //   expect(filter1).toBeInTheDocument();
  //   expect(filter2).toBeInTheDocument();
  //   expect(filter3).toBeInTheDocument();
  //   expect(filter4).toBeInTheDocument();
  // });
});
