import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import usePageName from '../hooks/usePageName';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getItem } from '../components/localStorage';

function Profile() {
  const pageName = usePageName();
  const [user, setUserEmail] = useState({ email: '' });
  const history = useHistory();

  useEffect(() => {
    const validUser = getItem('user') ? getItem('user') : '';
    setUserEmail(validUser);
  }, []);

  const redirectFavorites = () => {
    history.push('/favorite-recipes');
  };

  const redirectDone = () => {
    history.push('/done-recipes');
  };

  const handleLogout = () => {
    localStorage.clear('user');
    history.push('/');
  };

  return (
    <div>
      <Header pageName={ pageName } />
      <div>
        <p data-testid="profile-email">{ user.email }</p>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ redirectDone }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ redirectFavorites }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
