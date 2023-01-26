import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import RecipesDrinks from '../components/RecipesDrinks';
import RecipesMeals from '../components/RecipesMeals';

const NUMBER12 = 12;
const NUMBER13 = 13;

function Recipes() {
  const [dataApi, setDataApi] = useState([]);
  const { isLoading, getFetch } = useContext(DataContext);
  const [foodType, setFoodType] = useState(true);
  const id = useParams();

  useEffect(() => {
    const getDataApi = async () => {
      if (id.id === 'meals') {
        const data = await getFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        data.meals.splice(NUMBER12, NUMBER13);
        console.log(data.meals);
        setDataApi(data.meals);
        setFoodType(true);
      }
      if (id.id === 'drinks') {
        const data = await getFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        data.drinks.splice(NUMBER12, NUMBER13);
        console.log(data.drinks);
        setDataApi(data.drinks);
        setFoodType(false);
      }
    };
    getDataApi();
  }, [id]);

  return (
    <div>
      { isLoading && <h2>Loading...</h2> }
      { foodType ? <RecipesMeals dataApi={ dataApi } />
        : <RecipesDrinks dataApi={ dataApi } /> }
    </div>
  );
}

export default Recipes;
