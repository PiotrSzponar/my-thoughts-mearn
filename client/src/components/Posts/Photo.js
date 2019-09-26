import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';

const Photo = ({ photos, title, postId }) =>
  photos.length > 1 ? (
    <Carousel autoplay draggable pauseOnHover={false}>
      {photos.map(photo => (
        <img alt={title} src={`/images/posts/${postId}/${photo}`} key={photo} />
      ))}
    </Carousel>
  ) : (
    <img
      alt={title}
      src={`/images/posts/${postId}/${photos[0]}`}
      style={{ width: '100%' }}
    />
  );

Photo.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default Photo;
