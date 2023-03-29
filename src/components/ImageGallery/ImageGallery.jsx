import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import 'react-toastify/dist/ReactToastify.css';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags, isAnchor }) => (
        <ImageGalleryItem
          key={id}
          webImg={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onImageClick={onImageClick}
          isAnchor={isAnchor}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
