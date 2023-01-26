import React from 'react';
import PropTypes from 'prop-types';

function RecipesMeals({ dataApi }) {
  return (
    <div>
      {
        dataApi.map((food, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            test
            <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
            <img
              src={ food.strMealThumb }
              alt={ food.id }
              width="100px"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
}

RecipesMeals.propTypes = {
  dataApi: PropTypes.arrayOf(
    PropTypes.shape({
      strDrinkThumb: PropTypes.string,
      strDrink: PropTypes.string,
    }),
  ).isRequired,
};

export default RecipesMeals;
