import { useState } from 'react';
import { getItem } from '../components/localStorage';

function useProgress() {
  const [doneRecipe, setDoneRecipe] = useState(false);

  function checkDoneRecipe(recipe, type) {
    const arrProgress = getItem('doneRecipes') ? getItem('doneRecipes') : [];
    let check = false;
    if (arrProgress.length > 0) {
      const testName = recipe[type === 'meals' ? 'strMeal' : 'strDrink'];
      const correctType = type.replace('s', '');
      console.log();
      check = arrProgress.some((item) => (
        item.name === testName && item.type === correctType
      ));
    }
    setDoneRecipe(check);
  }

  return { doneRecipe, setDoneRecipe, checkDoneRecipe };
}

export default useProgress;
