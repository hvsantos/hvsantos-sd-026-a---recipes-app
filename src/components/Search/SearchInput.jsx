import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

function SearchInput() {
  const [search, setSearch] = useState('');

  const history = useHistory();
  const path = history.location.pathname;

  const { setFilterResult, setIsFilter } = useContext(DataContext);

  const mealOrDrinkApi = () => {
    if (path === '/meals') {
      return 'themealdb';
    } if (path === '/drinks') {
      return 'thecocktaildb';
    }
  };
  const mealOrDrink = () => {
    if (path === '/meals') {
      return 'meals';
    } if (path === '/drinks') {
      return 'drinks';
    }
  };

  const handleClickButton = async () => {
    const inputValue = document.querySelector('[data-testid="search-input"]').value;
    if (search === 'ingredient') {
      const response = await fetch(`https://www.${mealOrDrinkApi()}.com/api/json/v1/1/filter.php?i=${inputValue}`);
      const data = await response.json();
      setIsFilter(true);
      console.log(data);
      setFilterResult(data[mealOrDrink()]);
    } if (search === 'name') {
      const response = await fetch(`https://www.${mealOrDrinkApi()}.com/api/json/v1/1/search.php?s=${inputValue}`);
      const data = await response.json();
      setIsFilter(true);
      setFilterResult(data[mealOrDrink()]);
    } if (search === 'first-letter') {
      if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const response = await fetch(`https://www.${mealOrDrinkApi()}.com/api/json/v1/1/search.php?f=${inputValue}`);
      const data = await response.json();
      return data;
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
