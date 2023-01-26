import React from 'react';
// import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
// import profileTopButton from '../images/profileIcon.svg';
import useSearchIcon from '../hooks/useSearchIcon';
import useProfileIcon from '../hooks/useProfileIcon';

function Header({ pageName }) {
  const searchIcon = useSearchIcon(pageName);
  const profileIcon = useProfileIcon();
  return (
    <div>
      { profileIcon }
      { searchIcon }
      <h1 data-testid="page-title">
        { pageName }
      </h1>
      <SearchBar />
    </div>
  );
}

export default Header;

Header.propTypes = {}.isRequired;
