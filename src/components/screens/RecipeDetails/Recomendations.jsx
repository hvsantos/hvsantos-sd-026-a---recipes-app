import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading';

import CardRecomendation from './CardRecomendation';

const six = 6;
const five = 5;
const zero = 0;

export default function Recomendations(props) {
  const { type } = props;
  const [recipeRec, setRecipeRec] = useState(null);
  const [carrInd, setCarrInd] = useState({ min: 0, max: 1 });
  useEffect(() => {
    const url = type === 'drinks'
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(url)
      .then((response) => response.json())
      .then((data) => data[type].slice(zero, six))
      .then((data) => setRecipeRec(data));
  }, [type]);

  function handleClick(click) {
    if (click === 'minus') {
      setCarrInd((prev) => ({
        min: prev.min === zero ? five : prev.min - 1,
        max: prev.max === zero ? five : prev.max - 1,
      }));
    }
    if (click === 'plus') {
      setCarrInd((prev) => ({
        min: prev.min === five ? zero : prev.min + 1,
        max: prev.max === five ? zero : prev.max + 1,
      }));
    }
  }

  if (!recipeRec) return <Loading />;
  return (
    <div>
      <h2>Recomendations:</h2>
      <div
        style={ {
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        } }
      >
        <button type="button" onClick={ () => handleClick('minus') }>{'<'}</button>
        { recipeRec.map((recipe, index) => (
          <CardRecomendation
            key={ recipe[type === 'meals' ? 'idMeal' : 'idDrink'] }
            recipe={ recipe }
            type={ type }
            index={ index }
            indexComp={ index === carrInd.min || index === carrInd.max }
          />
        )) }
        <button type="button" onClick={ () => handleClick('plus') }>{'>'}</button>
      </div>
    </div>
  );
}

Recomendations.propTypes = {
  type: PropTypes.string,
}.isRequired;
