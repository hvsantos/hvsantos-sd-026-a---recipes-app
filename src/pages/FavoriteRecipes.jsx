import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import usePageName from '../hooks/usePageName';
import { saveItem, getItem } from '../components/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const pageName = usePageName();
  const [favorites, setFavorites] = useState([]);
  const [hasFavorite, setHasFavorite] = useState(true);
  const [copy, setCopy] = useState(false);
  const [showFavorites, setShowFavorites] = useState([]);

  useEffect(() => {
    const storageFavorites = getItem('favoriteRecipes');
    const validStorage = storageFavorites || [];
    setFavorites(validStorage);
    setHasFavorite(!!validStorage);
    setShowFavorites(validStorage);
  }, []);

  function handleShare(type, id) {
    const where = type === 'meal' ? 'meals' : 'drinks';
    clipboardCopy(`http://localhost:3000/${where}/${id}`);
    setCopy(true);
  }

  function handleNotFavorite(id) {
    const control = favorites;
    const control2 = showFavorites;
    const removedFavoriteFilter = control2.filter((el) => el.id !== id);
    const removedFavorite = control.filter((el) => el.id !== id);
    saveItem('favoriteRecipes', removedFavorite);
    setFavorites(removedFavorite);
    setShowFavorites(removedFavoriteFilter);
  }

  function handleFilter({ target }) {
    const control = favorites;
    const filteredFavorite = control.filter((el) => el.type === target.value);
    setShowFavorites(filteredFavorite);
  }

  function removeFilter() {
    const control = favorites;
    setShowFavorites(control);
  }

  return (
    <div>
      <Header pageName={ pageName } />
      { copy ? <p>Link copied!</p> : '' }
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="meal"
          onClick={ removeFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="meal"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>
      { hasFavorite ? (
        showFavorites.map((el, index) => (
          <div key={ el.id }>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { el.type === 'meal' ? `${el.nationality} - ${el.category}`
                : el.alcoholicOrNot }
            </p>
            <Link to={ el.type === 'meal' ? `/meals/${el.id}` : `/drinks/${el.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ el.name }</p>
              <img
                src={ el.image }
                alt={ el.name }
                data-testid={ `${index}-horizontal-image` }
                width="200"
              />
            </Link>
            <input
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShare(el.type, el.id) }
              src={ shareIcon }
              alt="share-button"
            />
            <input
              type="image"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleNotFavorite(el.id) }
              src={ blackHeartIcon }
              alt="favorite-button"
            />
          </div>
        ))
      ) : '' }
    </div>
  );
}

export default FavoriteRecipes;
