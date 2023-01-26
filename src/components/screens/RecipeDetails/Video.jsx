import React from 'react';
import PropTypes from 'prop-types';

export default function Video(props) {
  const { videoUrl } = props;
  const agoraVai = videoUrl.replace('watch?v=', 'embed/');
  console.log(agoraVai);
  return (
    <iframe
      width="560"
      height="315"
      src={ agoraVai }
      title="Recipe Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      data-testid="video"
      allowFullScreen
    />
  );
}

Video.propTypes = {
  videoUrl: PropTypes.string,
}.isRequired;
