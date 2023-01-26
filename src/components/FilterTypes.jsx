import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../context/DataContext';

function FilterTypes({ filtersData }) {
  const { setFilter, setIsFilter, isFilter } = useContext(DataContext);

  const onClick = ({ target }) => {
    setFilter(target.value);
    setIsFilter(!isFilter);
  };

  return (
    <div>
      {
        filtersData.map((filters, index) => (
          <button
            key={ `${filters.strCategory}${index}` }
            type="button"
            data-testid={ `${filters.strCategory}-category-filter` }
            value={ filters.strCategory.toLowerCase() }
            onClick={ onClick }
          >
            { filters.strCategory }
          </button>
        ))
      }
    </div>
  );
}

FilterTypes.propTypes = {
  filtersData: PropTypes.arrayOf(
    PropTypes.shape({
      strDrinkThumb: PropTypes.string,
      strDrink: PropTypes.string,
    }),
  ).isRequired,
};

export default FilterTypes;
