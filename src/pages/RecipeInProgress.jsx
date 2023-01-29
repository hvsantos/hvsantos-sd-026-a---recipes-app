import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getItem, saveItem } from '../components/localStorage';
// import handleFavorites from '../hooks/UseFavorite';
import useFavorites from '../hooks/UseFavorite';

const arrTest = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

function RecipeInProgress(props) {
  const { isFavorite, handleFavorites, hasFavorite } = useFavorites(false);
  const history = useHistory();
  const { getFetch } = useContext(DataContext);
  const [recipeInfo, setRecipeInfo] = useState({});
  const [foodType, setFoodType] = useState(true);
  const [copy, setCopy] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { match: { params: { id }, url } } = props;
  const where = url.split('/')[1];

  useEffect(() => {
    const fetchUrl = where === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const getDataApi = async () => {
      if (!getItem('test')) {
        saveItem('test', { drinks: {}, meals: {} });
      }
      const dataApi = await getFetch(fetchUrl + id);
      hasFavorite(dataApi[Object.keys(dataApi)][0], where);
      setRecipeInfo(dataApi[Object.keys(dataApi)][0]);
      setFoodType(Object.keys(dataApi)[0] === 'meals');
      const dataApitest = dataApi[Object.keys(dataApi)][0];
      const check = () => {
        let arrCheck = [];
        arrTest.forEach((el) => {
          if (dataApitest[`strIngredient${el}`]) {
            const checkList = {
              ingredient: dataApitest[`strIngredient${el}`],
              measure: dataApitest[`strMeasure${el}`],
              checked: false,
            };
            arrCheck = [...arrCheck, checkList];
          }
        });
        setChecked(arrCheck);
        const test2 = getItem('test');
        test2[where] = { ...test2[where], [id]: arrCheck };
        saveItem('test', test2);
      };
      if (getItem('test')[where][id]) {
        setChecked(getItem('test')[where][id]);
      } else {
        check();
      }
    };
    getDataApi();
  }, []);

  function handleShare() {
    clipboardCopy(`http://localhost:3000/${where}/${id}`);
    setCopy(true);
  }

  function handleChecked({ target }) {
    const checkTest = [...checked];
    checkTest[target.value].checked = !checked[target.value].checked;
    const validBTn = checkTest.reduce((acc, curr) => acc && curr.checked, true);
    setIsButtonDisabled(!validBTn);
    setChecked(checkTest);
    const test3 = getItem('test');
    test3[where] = { ...test3[where], [id]: checkTest };
    saveItem('test', test3);
  }

  function handleFinishRecipe() {
    if (!getItem('doneRecipes')) {
      saveItem('doneRecipes', []);
    }
    let storage = getItem('doneRecipes');
    const type = where === 'meals';
    storage = [...storage, {
      alcoholicOrNot: type ? '' : recipeInfo.strAlcoholic,
      id: recipeInfo[type ? 'idMeal' : 'idDrink'],
      nationality: recipeInfo.strArea ? recipeInfo.strArea : '',
      name: recipeInfo[type ? 'strMeal' : 'strDrink'],
      category: recipeInfo.strCategory ? recipeInfo.strCategory : '',
      image: recipeInfo[type ? 'strMealThumb' : 'strDrinkThumb'],
      tags: recipeInfo.strTags ? recipeInfo.strTags.split(',') : [],
      type: type ? 'meal' : 'drink',
      doneDate: new Date(),
    }];
    saveItem('doneRecipes', storage);
    history.push('/done-recipes');
  }

  function handleFav() {
    handleFavorites(recipeInfo, where);
  }

  return (
    <div>
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
      <input
        type="image"
        data-testid="favorite-btn"
        onClick={ handleFav }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite-button"
      />
      {/* <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFav }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-button"
        />
      </button> */}
      { copy ? <p>Link copied!</p> : '' }
      {
        recipeInfo && (
          <div>
            <div>
              <h2
                data-testid="recipe-title"
              >
                { foodType ? recipeInfo.strMeal : recipeInfo.strDrink }
              </h2>
              <img
                src={ foodType ? recipeInfo.strMealThumb : recipeInfo.strDrinkThumb }
                alt={ foodType ? recipeInfo.idMeal : recipeInfo.idDrink }
                width="180px"
                data-testid="recipe-photo"
              />
              <p data-testid="recipe-category">
                { recipeInfo.strCategory }
              </p>
              <p data-testid="instructions">
                { recipeInfo.strInstructions }
              </p>
            </div>
            <div>
              {
                checked && checked.map((item, index) => (
                  <label
                    key={ index }
                    htmlFor={ index }
                    data-testid={ `${index}-ingredient-step` }
                    style={ { textDecoration: item.checked
                      ? 'line-through solid rgb(0, 0, 0)' : '' } }
                  >
                    <input
                      type="checkbox"
                      name="ingredient"
                      id={ index }
                      value={ index }
                      checked={ item.checked }
                      onChange={ handleChecked }
                    />
                    { `${item.measure} ${item.ingredient}` }
                  </label>
                ))
              }
            </div>
          </div>
        )
      }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isButtonDisabled }
        style={ {
          position: 'fixed',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        } }
        onClick={ () => handleFinishRecipe() }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;

export default RecipeInProgress;
