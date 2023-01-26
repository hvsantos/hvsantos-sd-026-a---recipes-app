import React from 'react';
import PropTypes from 'prop-types';

function FilterTypes({ filtersData }) {
  console.log(filtersData);
  return (
    <div>
      {
        filtersData.map((filter, index) => (
          <button
            key={ `${filter.strCategory}${index}` }
            type="button"
            data-testid={ `${filter.strCategory}-category-filter` }
          >
            { filter.strCategory }
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
