import React, { useEffect, useState } from 'react';
import usePageName from '../hooks/usePageName';
import Header from '../components/Header';
import { getItem } from '../components/localStorage';
import CardRecipe from '../components/screens/DoneRecipes/CardRecipe';

function DoneRecipes() {
  const [btnOpt, setBtnOpt] = useState('All');
  const [doneArr, setDoneArr] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);

  useEffect(() => {
    setDoneArr(getItem('doneRecipes') ? getItem('doneRecipes') : []);
  }, []);

  useEffect(() => {
    function checkType(type) {
      switch (type) {
      case 'Meals':
        return doneArr.filter((item) => item.type === 'meal');
      case 'Drinks':
        return doneArr.filter((item) => item.type === 'drink');
      default:
        return doneArr;
      }
    }

    setFilteredArr(checkType(btnOpt));
  }, [doneArr, btnOpt]);

  const pageName = usePageName();
  return (
    <div>
      <Header pageName={ pageName } />
      <div style={ { display: 'flex', gap: '5px' } }>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setBtnOpt('All') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setBtnOpt('Meals') }
        >
          Meals
        </button>
        <button
          onClick={ () => setBtnOpt('Drinks') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { filteredArr.length === 0
        ? '...'
        : filteredArr.map((recipe, index) => (
          <CardRecipe
            key={ recipe.id }
            image={ recipe.image }
            category={ recipe.type === 'meal'
              ? recipe.category
              : recipe.alcoholicOrNot }
            name={ recipe.name }
            data={ recipe.doneDate }
            type={ recipe.type }
            index={ index }
            nationality={ recipe.nationality }
            tags={ recipe.tags }
            id={ recipe.id }
          />
        )) }
    </div>
  );
}

export default DoneRecipes;
