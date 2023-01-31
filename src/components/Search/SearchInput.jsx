import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

function SearchInput() {
  const [search, setSearch] = useState('');
  const id = useParams();
  const history = useHistory();

  const { setIsFilterSearchBar } = useContext(DataContext);

  const mealOrDrinkApi = () => {
    if (id.id === 'meals') {
      return 'themealdb';
    } if (id.id === 'drinks') {
      return 'thecocktaildb';
    }
  };
  const mealOrDrink = () => {
    if (id.id === 'meals') {
      return 'meals';
    } if (id.id === 'drinks') {
      return 'drinks';
    }
  };

  const idMealOrDrink = () => {
    if (id.id === 'meals') {
      return 'idMeal';
    } if (id.id === 'drinks') {
      return 'idDrink';
    }
  };

  const testResults = (dataResults) => {
    const NUMBER12 = 12;
    console.log(dataResults);
    if (dataResults[mealOrDrink()] === null) {
      const alert = ('Sorry, we haven\'t found any recipes for these filters.');
      global.alert(alert);
    } else if (dataResults[mealOrDrink()] !== null) {
      switch (dataResults[mealOrDrink()].length) {
      case 1:
        history.push(
          `/${mealOrDrink()}/${dataResults[mealOrDrink()][0][idMealOrDrink()]}`,
        );
        break;
      default:
        setIsFilterSearchBar(dataResults[mealOrDrink()].slice(0, NUMBER12));
        break;
      }
    }
  };

  const handleClickButton = async () => {
    const inputValue = document.querySelector('[data-testid="search-input"]').value;
    if (search === 'ingredient') {
      const response = await fetch(`https://www.${mealOrDrinkApi()}.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const data = await response.json();
      testResults(data);
    } if (search === 'name') {
      const response = await fetch(`https://www.${mealOrDrinkApi()}.com/api/json/v1/1/search.php?s=${inputValue}`);
      const data = await response.json();
      testResults(data);
    } if (search === 'first-letter') {
      if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const response = await fetch(`https://www.${mealOrDrinkApi()}.com/api/json/v1/1/search.php?f=${inputValue}`);
      const data = await response.json();
      setIsFilterSearchBar(data[mealOrDrink()]);
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
      />
      <div>
        <div>
          <label htmlFor="ingredient">
            <input
              type="radio"
              name="search"
              id="ingredient"
              data-testid="ingredient-search-radio"
              onClick={ () => setSearch('ingredient') }
            />
            Ingrediente
          </label>
        </div>
        <div>
          <label htmlFor="name">
            <input
              type="radio"
              name="search"
              id="name"
              data-testid="name-search-radio"
              onClick={ () => setSearch('name') }
            />
            Nome
          </label>
        </div>
        <div>
          <label htmlFor="first-letter">
            <input
              type="radio"
              name="search"
              id="first-letter"
              data-testid="first-letter-search-radio"
              onClick={ () => setSearch('first-letter') }
            />
            Primeira letra
          </label>
        </div>
      </div>
      <button
        data-testid="exec-search-btn"
        id="search-btn"
        onClick={ handleClickButton }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchInput;
