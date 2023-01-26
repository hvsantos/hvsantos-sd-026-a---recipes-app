import searchIcon from '../images/searchIcon.svg';

const useSearchIcon = (pageName) => {
  if (pageName === 'Profile'
    || pageName === 'Done Recipes'
    || pageName === 'Favorite Recipes') {
    return (null);
  } return (
    <object
      data-testid="search-top-btn"
      className="search-top-btn"
      type="image/svg+xml"
      data={ searchIcon }
      src={ searchIcon }
    >
      search-top-btn
    </object>
  );
};

export default useSearchIcon;
