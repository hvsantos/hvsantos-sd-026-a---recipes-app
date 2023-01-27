import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Recomendations from './Recomendations';

const style = {
  height: '200px',
  width: '200px',
};

export default function DrinksDetail(props) {
  const [arrIng, setArrIng] = useState([]);
  const { drinks } = props;
  const recipe = drinks[0];
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
          id: recipe.idDrink,
        };
        setArrIng((arr) => [...arr, newObj]);
      }
    }
  }, [recipe]);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        style={ style }
      />
      <h2 data-testid="recipe-title">{ recipe.strDrink }</h2>
      <h5 data-testid="recipe-category">{ recipe.strAlcoholic }</h5>
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
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Recomendations type="meals" />
    </div>
  );
}

DrinksDetail.propTypes = {
  drinks: PropTypes.shape(Object),
}.isRequired;
