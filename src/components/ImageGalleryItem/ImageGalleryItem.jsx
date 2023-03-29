import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  imageRef = createRef();

  componentDidMount() {
    if (!this.props.isAnchor) return;
    const y =
      this.imageRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      80;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }

  handleClick = () => {
    const { tags, onImageClick, largeImageURL } = this.props;
    onImageClick({ largeImageURL, tags });
  };

  render() {
    const { webImg, tags, isAnchor } = this.props;
    return (
      <GalleryItem
        onClick={this.handleClick}
        ref={isAnchor ? this.imageRef : null}
      >
        <GalleryItemImage src={webImg} alt={tags} />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  webImg: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
