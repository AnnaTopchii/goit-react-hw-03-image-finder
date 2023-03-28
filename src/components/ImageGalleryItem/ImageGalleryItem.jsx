import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webImg, tags, onImageClick }) => {
  return (
    <GalleryItem onClick={onImageClick}>
      <GalleryItemImage src={webImg} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
