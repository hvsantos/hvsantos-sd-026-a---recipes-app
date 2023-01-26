import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

const useSearchIcon = (pageName) => {
  const [search, setSearch] = useState(false);

  const showRemoveSearch = () => {
    if (search === true) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  if (pageName === 'Profile'
    || pageName === 'Done Recipes'
    || pageName === 'Favorite Recipes') {
    return (null);
  }
  return (
    <>
      <button
        onClick={ showRemoveSearch }
      >
        <img
          data-testid="search-top-btn"
          className="search-top-btn"
          type="image/svg+xml"
          data={ searchIcon }
          src={ searchIcon }
          alt="search-icon"
        />
      </button>
      { search === true ? <input type="text" data-testid="search-input" /> : null }
    </>
  );
};

export default useSearchIcon;
