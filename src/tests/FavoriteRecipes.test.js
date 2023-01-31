import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import routeData from 'react-router';
import renderWithRouter from './Render With Router/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DataProvider from '../context/DataContext';
import { saveItem } from '../components/localStorage';

const TEST_ID_NAME = '0-horizontal-name';
const TEST_ID_IMG = '0-horizontal-image';
const TEST_ID_INFO = '0-horizontal-top-text';
const TEST_ID_FAV = '0-horizontal-favorite-btn';
const TEST_ID_NAME2 = '1-horizontal-name';
const TEST_ID_IM2 = '1-horizontal-image';
const TEST_ID_INF2 = '1-horizontal-top-text';
const TEST_ID_FA2 = '1-horizontal-favorite-btn';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
const mockLocation = {
  pathname: '/welcome',
  hash: '',
  search: '',
  state: '',
};

describe('Testando a página de Favoritos', () => {
  it('Verifica se a página renderiza corretamente com seus componentes', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    saveItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(
      <DataProvider>
        <FavoriteRecipes />
      </DataProvider>,
    );

    const pageTitle = screen.getByTestId('page-title');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');

    expect(pageTitle).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    const itemName1 = screen.getByTestId(TEST_ID_NAME);
    const itemImg1 = screen.getByTestId(TEST_ID_IMG);
    const info1 = screen.getByTestId(TEST_ID_INFO);
    const shareBtn1 = screen.getByTestId(TEST_ID_FAV);
    const itemName2 = screen.getByTestId(TEST_ID_NAME2);
    const itemImg2 = screen.getByTestId(TEST_ID_IM2);
    const info2 = screen.getByTestId(TEST_ID_INF2);
    const shareBtn2 = screen.getByTestId(TEST_ID_FA2);

    expect(itemName1).toBeInTheDocument();
    expect(itemImg1).toBeInTheDocument();
    expect(info1).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();
    expect(itemName2).toBeInTheDocument();
    expect(itemImg2).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
    expect(shareBtn2).toBeInTheDocument();

    userEvent.click(mealsBtn);

    expect(itemName1).toBeInTheDocument();
    expect(itemImg1).toBeInTheDocument();
    expect(info1).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();
    expect(itemName1).toHaveTextContent(favoriteRecipes[0].name);

    userEvent.click(drinksBtn);

    const drinkName = screen.getByTestId(TEST_ID_NAME);
    const drinkImg = screen.getByTestId(TEST_ID_IMG);
    const drinkInfo = screen.getByTestId(TEST_ID_INFO);
    const drinkShareBtn = screen.getByTestId(TEST_ID_FAV);
    expect(drinkName).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
    expect(drinkInfo).toBeInTheDocument();
    expect(drinkShareBtn).toBeInTheDocument();
    expect(drinkName).toHaveTextContent(favoriteRecipes[1].name);

    userEvent.click(allBtn);

    const itemNameBtn1 = screen.getByTestId(TEST_ID_NAME);
    const itemImgBtn1 = screen.getByTestId(TEST_ID_IMG);
    const infoBtn1 = screen.getByTestId(TEST_ID_INFO);
    const shareBtnBtn1 = screen.getByTestId(TEST_ID_FAV);
    const itemNameBtn2 = screen.getByTestId(TEST_ID_NAME2);
    const itemImgBtn2 = screen.getByTestId(TEST_ID_IM2);
    const infoBtn2 = screen.getByTestId(TEST_ID_INF2);
    const shareBtnBtn2 = screen.getByTestId(TEST_ID_FA2);

    expect(itemNameBtn1).toBeInTheDocument();
    expect(itemImgBtn1).toBeInTheDocument();
    expect(infoBtn1).toBeInTheDocument();
    expect(shareBtnBtn1).toBeInTheDocument();
    expect(itemNameBtn2).toBeInTheDocument();
    expect(itemImgBtn2).toBeInTheDocument();
    expect(infoBtn2).toBeInTheDocument();
    expect(shareBtnBtn2).toBeInTheDocument();

    expect(itemNameBtn1).toHaveTextContent(favoriteRecipes[0].name);
    expect(itemNameBtn2).toHaveTextContent(favoriteRecipes[1].name);

    userEvent.click(shareBtnBtn1);

    const itemNameBtn = screen.getByTestId(TEST_ID_NAME);
    const itemImgBtn = screen.getByTestId(TEST_ID_IMG);
    const infoBtn = screen.getByTestId(TEST_ID_INFO);
    const shareBtnBtn = screen.getByTestId(TEST_ID_FAV);

    expect(itemNameBtn).toBeInTheDocument();
    expect(itemImgBtn).toBeInTheDocument();
    expect(infoBtn).toBeInTheDocument();
    expect(shareBtnBtn).toBeInTheDocument();
    expect(itemNameBtn2).toHaveTextContent(favoriteRecipes[1].name);

    userEvent.click(itemNameBtn);

    expect(history.location.pathname).toBe('/drinks/178319');
  });
  it('Verifica a funcionalidade do botão favorito', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    const text1 = 'http://localhost:3000/meals/52771';
    const mockWriteText = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
    });

    saveItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(
      <DataProvider>
        <FavoriteRecipes />
      </DataProvider>,
    );
    const favBtn1 = screen.getByTestId(TEST_ID_FAV);
    const itemName1 = screen.getByTestId(TEST_ID_NAME);
    const itemImg = screen.getByTestId(TEST_ID_IMG);
    const favBtn2 = screen.getByTestId(TEST_ID_FA2);
    expect(itemName1).toBeInTheDocument();
    expect(favBtn1).toBeInTheDocument();
    expect(itemName1).toHaveTextContent(favoriteRecipes[0].name);

    userEvent.click(favBtn2);
    expect(itemName1).toBeInTheDocument();
    expect(itemName1).toHaveTextContent(favoriteRecipes[0].name);

    userEvent.click(itemImg);

    expect(history.location.pathname).toBe('/meals/52771');

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(shareBtn);
    expect(mockWriteText).toHaveBeenCalledWith(text1);
  });
  it('Verifica se a página renderiza sem nenhum favorito salvo', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    renderWithRouter(
      <DataProvider>
        <FavoriteRecipes />
      </DataProvider>,
    );

    const pageTitle = screen.getByTestId('page-title');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');

    expect(pageTitle).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
  it('Verifica o butão de desfavoritar', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    const text2 = 'http://localhost:3000/drinks/178319';
    const mockWriteText = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
    });

    saveItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(
      <DataProvider>
        <FavoriteRecipes />
      </DataProvider>,
    );
    const shareBtn = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(shareBtn);
    expect(mockWriteText).toHaveBeenCalledWith(text2);

    const itemNameBtn2 = screen.getByTestId(TEST_ID_NAME2);
    userEvent.click(itemNameBtn2);
    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
