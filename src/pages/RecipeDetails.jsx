import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState(false);
  const { match: { params: { id }, url } } = props;

  useEffect(() => {
    const where = url.split('/')[1];
    const fetchUrl = where === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

    fetch(fetchUrl + id)
      .then((response) => response.json())
      .then((response) => setRecipe(response.meals[0]))
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [url, id]);
  console.log(recipe);
  console.log(error);

  return (
    <div>RecipeDetails</div>
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
