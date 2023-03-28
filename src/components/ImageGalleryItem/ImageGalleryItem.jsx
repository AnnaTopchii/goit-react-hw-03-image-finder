import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);
    this.imageRef = createRef();
  }

  componentDidMount() {
    this.imageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  handleClick = () => {
    const { tags, onImageClick, largeImageURL } = this.props;
    onImageClick({ largeImageURL, tags });
    this.imageRef.current.focus();
  };

  render() {
    const { webImg, tags } = this.props;
    return (
      <GalleryItem onClick={this.handleClick} ref={this.imageRef}>
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
