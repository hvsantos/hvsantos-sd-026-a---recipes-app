import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import usePageName from '../hooks/usePageName';
import { DataContext } from '../context/DataContext';
import RecipesDrinks from '../components/RecipesDrinks';
import RecipesMeals from '../components/RecipesMeals';
import FilterTypes from '../components/FilterTypes';

const NUMBER12 = 12;
const NUMBER13 = 13;
const NUMBER5 = 5;
const NUMBER9 = 9;

function Recipes() {
  const [dataApi, setDataApi] = useState([]);
  const [filtersData, setFiltersData] = useState([]);
  const [foodType, setFoodType] = useState(true);
  const { isLoading, getFetch } = useContext(DataContext);
  const id = useParams();

  const pageName = usePageName();

  useEffect(() => {
    const getDataApi = async () => {
      if (id.id === 'meals') {
        const data = await getFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dataFilters = await getFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        data.meals.splice(NUMBER12, NUMBER13);
        dataFilters.meals.splice(NUMBER5, NUMBER9);
        setDataApi(data.meals);
        setFiltersData(dataFilters.meals);
        setFoodType(true);
      }
      if (id.id === 'drinks') {
        const data = await getFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dataFilters = await getFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        data.drinks.splice(NUMBER12, NUMBER13);
        dataFilters.drinks.splice(NUMBER5, NUMBER9);
        setDataApi(data.drinks);
        setFiltersData(dataFilters.drinks);
        setFoodType(false);
      }
    };
    getDataApi();
  }, [id, getFetch]);

  return (
    <div>
      <Header pageName={ pageName } />
      { isLoading && <h2>Loading...</h2> }
      <FilterTypes filtersData={ filtersData } />
      { foodType ? <RecipesMeals dataApi={ dataApi } />
        : <RecipesDrinks dataApi={ dataApi } /> }
    </div>
  );
}

export default Recipes;
