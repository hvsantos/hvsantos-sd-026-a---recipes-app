import { useLocation } from 'react-router-dom';

function usePageName() {
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];
  let usedName = '';

  switch (pageName) {
  case 'meals':
    usedName = 'Meals';
    break;
  case 'drinks':
    usedName = 'Drinks';
    break;
  case 'profile':
    usedName = 'Profile';
    break;
  case 'done-recipes':
    usedName = 'Done Recipes';
    break;
  case 'favorite-recipes':
    usedName = 'Favorite Recipes';
    break;
  default:
    break;
  }
  return usedName;
}

export default usePageName;
