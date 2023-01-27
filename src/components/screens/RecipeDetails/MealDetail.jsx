import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Video from './Video';
import Recomendations from './Recomendations';

export default function MealDetail(props) {
  const [arrIng, setArrIng] = useState([]);
  const { meal } = props;
  const recipe = meal[0];
  const style = {
    height: '200px',
    width: '200px',
  };
  useEffect(() => {
    const ingred = 'strIngredient';
    const measure = 'strMeasure';
    const num20 = 20;
    for (let i = 0; i < num20; i += 1) {
      if (recipe[ingred + i] !== null
        && recipe[ingred + i] !== undefined
        && recipe[ingred + i] !== ''
      ) {
        const newObj = {
          ingredient: recipe[ingred + i],
          measure: recipe[measure + i] ?? '',
          id: recipe.idMeal,
        };
        setArrIng((arr) => [...arr, newObj]);
      }
    }
  }, [recipe]);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        style={ style }
      />
      <h2 data-testid="recipe-title">{ recipe.strMeal }</h2>
      <h5 data-testid="recipe-category">{ recipe.strCategory }</h5>
      <ul>
        Ingredientes:
        {arrIng.map(({ ingredient, measure, id }, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ id + index }
          >
            { `${measure} ${ingredient}` }
          </li>
        ))}
      </ul>
      <Video videoUrl={ recipe.strYoutube } />
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Recomendations type="drinks" />
    </div>
  );
}

MealDetail.propTypes = {
  meal: PropTypes.shape(Object),
}.isRequired;
