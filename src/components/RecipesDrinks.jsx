import React from 'react';
import PropTypes from 'prop-types';

function RecipesDrinks({ dataApi }) {
  return (
    <div>
      {
        dataApi.map((food, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>{ food.strDrink }</p>
            <img
              src={ food.strDrinkThumb }
              alt={ food.strDrinkThumb }
              width="100px"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
}

RecipesDrinks.propTypes = {
  dataApi: PropTypes.arrayOf(
    PropTypes.shape({
      strDrinkThumb: PropTypes.string,
      strDrink: PropTypes.string,
    }),
  ).isRequired,
};

export default RecipesDrinks;
