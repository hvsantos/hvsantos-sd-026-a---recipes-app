import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MealDetail from '../components/screens/RecipeDetails/MealDetail';
import DrinksDetails from '../components/screens/RecipeDetails/DrinksDetail';
import Loading from '../components/Loading';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState(null);
  // Remover o error e o catch abaixo após concluido
  const [error, setError] = useState(false);
  const { match: { params: { id }, url } } = props;
  const where = url.split('/')[1];

  useEffect(() => {
    const fetchUrl = where === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

    fetch(fetchUrl + id)
      .then((response) => response.json())
      .then((response) => setRecipe(response))
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [url, id, where]);
  console.log(error);
  if (!recipe) {
    return <Loading />;
  }
  return where === 'meals'
    ? <MealDetail meal={ recipe.meals } />
    : <DrinksDetails drinks={ recipe.drinks } />;
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
