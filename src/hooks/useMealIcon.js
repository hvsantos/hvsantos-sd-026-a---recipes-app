import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';

const useMealIcon = () => (
  <Link to="/meals">
    <img
      data-testid="meals-bottom-btn"
      data={ mealIcon }
      src={ mealIcon }
      alt="meals-bottom-btn"
    />
  </Link>
);

export default useMealIcon;
