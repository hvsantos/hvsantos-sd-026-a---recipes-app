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
  const { isLoading, getFetch, filter, isFilter, setIsFilter } = useContext(DataContext);
  const [filterResult, setFilterResult] = useState([]);
  // const [showFilterResult, setShowFilterResult] = useState(false);
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
  }, [id]);

  useEffect(() => {
    const getDataFilterResult = async () => {
      if (id.id === 'meals') {
        const data = await getFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`);
        console.log(data.meals);
        if (data.meals) {
          data.meals.splice(NUMBER12, data.meals.length - 1);
          console.log(data.meals);
          setFilterResult(data.meals);
        }
      }
      if (id.id === 'drinks') {
        const data = await getFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}s`);
        if (data.drinks) {
          data.drinks.splice(NUMBER12, data.drinks.length - 1);
          console.log(data);
          setFilterResult(data.drinks);
        }
      }
    };
    if (filter) {
      getDataFilterResult();
    }
  }, [filter]);

  const clearFilters = () => {
    setIsFilter(false);
  };

  return (
    <div>
      <Header pageName={ pageName } />
      <FilterTypes filtersData={ filtersData } />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ clearFilters }
      >
        All
      </button>
      { isLoading && <h2>Loading...</h2> }
      { foodType ? <RecipesMeals dataApi={ isFilter ? filterResult : dataApi } />
        : <RecipesDrinks dataApi={ isFilter ? filterResult : dataApi } /> }
    </div>
  );
}

export default Recipes;
