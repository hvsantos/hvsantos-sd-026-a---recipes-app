import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';

import MealDetail from '../components/screens/RecipeDetails/MealDetail';
import DrinksDetails from '../components/screens/RecipeDetails/DrinksDetail';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [copy, setCopy] = useState(false);
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

  function handleShare() {
    // const timeAlert = 2000;
    clipboardCopy(`http://localhost:3000${url}`);
    setCopy(true);
    // setTimeout(() => {
    //   setCopy(false);
    // }, timeAlert);
  }

  if (!recipe) {
    return <Loading />;
  }

  if (redirect) {
    return <Redirect to={ `${url}/in-progress` } />;
  }

  return (
    <div>
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          left: '80%',
        } }
      >
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShare }
        >
          <img
            src={ shareIcon }
            alt="share-button"
          />
        </button>
        { copy ? <p>Link copied!</p> : '' }
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img
            src={ whiteHeartIcon }
            alt="favorite-button"
          />
        </button>
      </div>
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
        onClick={ () => setRedirect(true) }
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
