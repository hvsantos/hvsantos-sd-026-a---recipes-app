import React from 'react';
import SearchBar from './SearchBar';
import profileTopButton from '../images/profileIcon.svg';
import useSearchIcon from '../hooks/showSearchButton';

function Header({ pageName }) {
  const searchIcon = useSearchIcon(pageName);
  return (
    <div>
      <object
        data-testid="profile-top-btn"
        className="profile-top-btn"
        type="image/svg+xml"
        data={ profileTopButton }
        src={ profileTopButton }
      >
        profile-top-btn
      </object>
      { searchIcon }
      <h1 data-testid="page-title">
        { pageName }
      </h1>
      <SearchBar />
    </div>
  );
}

export default Header;
