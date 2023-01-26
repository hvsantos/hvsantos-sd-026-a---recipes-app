import { Link } from 'react-router-dom';
import profileTopButton from '../images/profileIcon.svg';

const useProfileIcon = () => (
  <Link to="/profile">
    <img
      data-testid="profile-top-btn"
      className="profile-top-btn"
      data={ profileTopButton }
      src={ profileTopButton }
      alt="profile-top-btn"
    />
  </Link>
);

export default useProfileIcon;
