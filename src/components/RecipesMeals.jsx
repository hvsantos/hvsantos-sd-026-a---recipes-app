import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipesMeals({ dataApi }) {
  return (
    <div>
      {
        dataApi.map((food, index) => (
          <Link
            to={ `/meals/${food.idMeal}` }
            key={ index }
          >
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
              <img
                src={ food.strMealThumb }
                alt={ food.id }
                width="100px"
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
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
