import { useState } from 'react';
import { getItem } from '../components/localStorage';

function useProgress() {
  const [inProgress, setInProgress] = useState(false);

  function checkInProgress(recipe, type) {
    const arrProgress = getItem('inProgressRecipes')
      ? getItem('inProgressRecipes') : null;
    let check = false;
    if (arrProgress) {
      const testId = recipe[type === 'meals' ? 'idMeal' : 'idDrink'];
      check = Object.keys(arrProgress[type]).some((item) => item === testId);
    }
    setInProgress(check);
  }

  return { inProgress, setInProgress, checkInProgress };
}

export default useProgress;
