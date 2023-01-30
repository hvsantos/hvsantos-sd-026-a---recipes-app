import React, { useState } from 'react';

import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ url, testId }) {
  const [copy, setCopy] = useState(false);

  function handleShare() {
    clipboardCopy(`http://localhost:3000${url}`);
    setCopy(true);
  }
  return (
    <div>
      <input
        type="image"
        data-testid={ testId }
        onClick={ handleShare }
        src={ shareIcon }
        alt="share-button"
      />
      { copy ? <p>Link copied!</p> : '' }
    </div>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string,
}.isRequired;
