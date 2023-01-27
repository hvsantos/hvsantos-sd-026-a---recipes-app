import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MealDetail from '../components/screens/RecipeDetails/MealDetail';
import DrinksDetails from '../components/screens/RecipeDetails/DrinksDetail';
import Loading from '../components/Loading';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState(null);
  // Tirar o comentario somente SE necessario tratamento de erro
  // const [error, setError] = useState(false);
  const { match: { params: { id }, url } } = props;
  const where = url.split('/')[1];

  useEffect(() => {
    const fetchUrl = where === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

    fetch(fetchUrl + id)
      .then((response) => response.json())
      .then((response) => setRecipe(response))
      .catch(() => {
        // console.log(err);
        // setError(true);
      });
  }, [url, id, where]);
  if (!recipe) {
    return <Loading />;
  }
  return (
    <div>
      { where === 'meals'
        ? <MealDetail meal={ recipe.meals } />
        : <DrinksDetails drinks={ recipe.drinks } /> }
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ {
          position: 'fixed',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        } }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;
