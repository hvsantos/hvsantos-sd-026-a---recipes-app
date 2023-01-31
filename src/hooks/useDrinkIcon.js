import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';

const useDrinkIcon = () => (
  <Link to="/drinks">
    <img
      data-testid="drinks-bottom-btn"
      data={ drinkIcon }
      src={ drinkIcon }
      alt="meals-bottom-btn"
    />
  </Link>
);

export default useDrinkIcon;
