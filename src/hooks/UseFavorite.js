import { useState } from 'react';
import { saveItem, getItem } from '../components/localStorage';

function useFavorites(control) {
  const [isFavorite, setIsFavorite] = useState(control);

  const hasFavorite = (obj, tag) => {
    const compare = tag === 'meals';
    const savedFavorites = getItem('favoriteRecipes') ? getItem('favoriteRecipes') : [];
    const valid = savedFavorites ? savedFavorites
      .find((el) => el.id === obj[compare ? 'idMeal' : 'idDrink']) : false;
    setIsFavorite(!!valid);
    // console.log(!!valid);
  };

  const handleFavorites = (obj, tag) => {
    const compare = tag === 'meals';
    const newFavorite = {
      id: obj[compare ? 'idMeal' : 'idDrink'],
      name: obj[compare ? 'strMeal' : 'strDrink'],
      image: obj[compare ? 'strMealThumb' : 'strDrinkThumb'],
      type: tag.replace('s', ''),
      nationality: obj.strArea ?? '',
      alcoholicOrNot: obj.strAlcoholic ?? '',
      category: obj.strCategory,
    };
    const savedFavorites = getItem('favoriteRecipes') ? getItem('favoriteRecipes') : [];
    const valid = savedFavorites ? savedFavorites
      .find((el) => el.id === newFavorite.id) : false;
    if (valid) {
      const test = savedFavorites.filter((el) => el.id !== newFavorite.id);
      saveItem('favoriteRecipes', test);
      setIsFavorite(false);
      // console.log('test true');
    } else {
      saveItem('favoriteRecipes', [...savedFavorites, newFavorite]);
      // console.log('teste falso');
      setIsFavorite(true);
    }
  };

  return { handleFavorites, isFavorite, hasFavorite };
}

export default useFavorites;

// if (getItem('savedFavorites')) {
//   const valid = getItem('savedFavorites')
//     .find((el) => el.id === obj[where ? 'idMeal' : 'idDrink']);
//   setFavoriteBtn(valid);
// }
