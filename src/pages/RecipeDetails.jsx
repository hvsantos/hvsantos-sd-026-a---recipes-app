import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { DataContext } from '../context/DataContext';
import MealDetail from '../components/screens/RecipeDetails/MealDetail';
import DrinksDetails from '../components/screens/RecipeDetails/DrinksDetail';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavorites from '../hooks/UseFavorite';
import useProgress from '../hooks/useProgress';
import useDoneRecipe from '../hooks/useDoneRecipe';

function RecipeDetails(props) {
  const { isFavorite, handleFavorites, hasFavorite } = useFavorites(false);
  const { inProgress, checkInProgress } = useProgress();
  const { doneRecipe, checkDoneRecipe } = useDoneRecipe();
  const { recipe, setRecipe } = useContext(DataContext);
  const [redirect, setRedirect] = useState(false);
  const [copy, setCopy] = useState(false);
  const { match: { params: { id }, url } } = props;
  const where = url.split('/')[1];

  useEffect(() => {
    const fetchUrl = where === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

    fetch(fetchUrl + id)
      .then((response) => response.json())
      .then((response) => setRecipe(response));
  }, [url, id, where, setRecipe]);

  function handleShare() {
    clipboardCopy(`http://localhost:3000${url}`);
    setCopy(true);
    // const timeAlert = 2000;
    // setTimeout(() => {
    //   setCopy(false);
    // }, timeAlert);
  }

  useEffect(() => {
    if (recipe) {
      const savedRecipe = recipe[where][0];
      hasFavorite(savedRecipe, where);
      checkInProgress(savedRecipe, where);
      checkDoneRecipe(savedRecipe, where);
    }
  }, [recipe, hasFavorite, where, checkInProgress, checkDoneRecipe]);

  if (!recipe) {
    return <Loading />;
  }

  console.log(inProgress);

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
        <input
          type="image"
          data-testid="favorite-btn"
          onClick={ () => handleFavorites(recipe[where][0], where) }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-button"
        />
      </div>
      { where === 'meals'
        ? <MealDetail meal={ recipe.meals } />
        : <DrinksDetails drinks={ recipe.drinks } /> }
      { doneRecipe ? ''
        : (
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
            { inProgress ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        ) }
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
