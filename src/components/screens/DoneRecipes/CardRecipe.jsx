import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ShareButton from '../../ShareButton';

export default function CardRecipe(props) {
  const {
    category,
    image,
    name,
    data,
    type,
    index,
    nationality,
    tags,
    id,
  } = props;

  const url = `/${type}s/${id}`;

  return (
    <div style={ { marginTop: '15px' } }>
      <div
        style={ {
          position: 'absolute',
          left: '50%',
        } }
      >
        <ShareButton url={ url } testId={ `${index}-horizontal-share-btn` } />
      </div>
      <Link to={ url }>
        <img
          style={ {
            width: '200px',
          } }
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
      </Link>
      <h5 data-testid={ `${index}-horizontal-top-text` }>
        { nationality === ''
          ? `${category}`
          : `${nationality} - ${category}` }
      </h5>
      <p data-testid={ `${index}-horizontal-done-date` }>{ data }</p>
      { tags.map((tag, inx) => (
        <p
          key={ `${tag}${inx}` }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      )) }
    </div>
  );
}

CardRecipe.propTypes = {
  category: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.string,
  type: PropTypes.string,
  index: PropTypes.string,
  nationality: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
}.isRequired;
