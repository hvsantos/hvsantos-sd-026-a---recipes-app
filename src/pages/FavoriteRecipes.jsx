import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import usePageName from '../hooks/usePageName';
import { saveItem, getItem } from '../components/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import useFavorites from '../hooks/UseFavorite';

function FavoriteRecipes() {
  // const { isFavorite, handleFavorites, hasFavorite } = useFavorites(false);
  const pageName = usePageName();
  const [favorites, setFavorites] = useState([]);
  const [hasFavorite, setHasFavorite] = useState(true);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const storageFavorites = getItem('favoriteRecipes');
    const validStorage = storageFavorites || [];
    setFavorites(validStorage);
    setHasFavorite(!!validStorage);
  }, []);

  function handleShare(type, id) {
    console.log(id, type);
    const where = type === 'meal' ? 'meals' : 'drinks';
    clipboardCopy(`http://localhost:3000/${where}/${id}`);
    setCopy(true);
  }

  console.log(favorites);
  console.log(hasFavorite);

  return (
    <div>
      <Header pageName={ pageName } />
      { copy ? <p>Link copied!</p> : '' }
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { hasFavorite ? (
        favorites.map((el, index) => (
          <div key={ el.id }>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { el.type === 'meal' ? `${el.nationality} - ${el.category}`
                : el.alcoholicOrNot }
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ el.name }</p>
            <img
              src={ el.image }
              alt={ el.name }
              data-testid={ `${index}-horizontal-image` }
              width="200"
            />
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
              // onClick={ handleFav }
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
