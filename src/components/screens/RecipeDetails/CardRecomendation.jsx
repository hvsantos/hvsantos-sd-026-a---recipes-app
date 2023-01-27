import React from 'react';
import PropTypes from 'prop-types';

const style = {
  height: '100px',
  width: '100px',
};

export default function CardRecomendation(props) {
  const { recipe, type, index, indexComp } = props;
  return (
    <div
      data-testid={ `${index}-recommendation-card` }
      hidden={ !indexComp }
    >
      <img
        src={ recipe[type === 'meals' ? 'strMealThumb' : 'strDrinkThumb'] }
        alt={ recipe[type === 'meals' ? 'strMeal' : 'strDrink'] }
        style={ style }
      />
      <h4 data-testid={ `${index}-recommendation-title` }>
        { recipe[type === 'meals' ? 'strMeal' : 'strDrink'] }
      </h4>
      <p>{ recipe[type === 'meals' ? 'strCategory' : 'strAlcoholic'] }</p>
    </div>
  );
}

CardRecomendation.propTypes = {
  recipe: PropTypes.shape(Object),
  type: PropTypes.string,
  index: PropTypes.number,
  indexComp: PropTypes.boolean,
}.isRequired;
