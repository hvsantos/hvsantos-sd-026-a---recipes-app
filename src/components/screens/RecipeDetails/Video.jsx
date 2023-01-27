import React from 'react';
import PropTypes from 'prop-types';

export default function Video(props) {
  const { videoUrl } = props;
  const urlReplaced = videoUrl
    .replace('watch?v=', 'embed/');
  console.log(videoUrl);
  return (
    <iframe
      width="560"
      height="360"
      src={ urlReplaced }
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      data-testid="video"
      allowFullScreen
    />
  );
}

Video.propTypes = {
  videoUrl: PropTypes.string,
}.isRequired;
