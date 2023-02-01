import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';

const MEALS = 'https://www.themealdb.com/api/json/v1/1/';
// const DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

const mockFetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === `${MEALS}search.php?s=`) {
      return Promise.resolve(meals);
    } if (utl === `${MEALS}list.php?c=list`) {
      return Promise.resolve(mealCategories);
    }
  },
});

export default mockFetch;
