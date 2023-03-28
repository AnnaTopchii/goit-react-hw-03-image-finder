import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import api from 'services/api';

import 'react-toastify/dist/ReactToastify.css';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ images: [], currentPage: 1 });
      this.fetchImages();
    }

    if (this.state.currentPage > 1) {
      console.log(this.state.currentPage); // тут одразу починає працювати з 1 сторіки. ставити з 2 стр не правильно
      const CARD_HEIGHT = 300; // і воно перекидає не від поточного місця, я від верху сторінки
      window.scrollTo({
        top: CARD_HEIGHT * 2,
        behavior: 'smooth',
      });
    }
  }

  fetchImages = () => {
    const { currentPage } = this.state;
    const { query } = this.props;
    const options = { query, currentPage };

    this.setState({ status: 'pending' });

    api
      .fetchImages(options)
      .then(images => {
        if (images.totalHits === 0) {
          this.setState({ status: 'idle' });
          return toast.error(`Sorry, we didn't find any pictures of ${query}`);
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: 'resolved',
          currentPage: prevState.currentPage + 1,
        }));

        if (currentPage > 1) {
          console.log(currentPage); // why it does't work?
          const CARD_HEIGHT = 300;
          window.scrollTo({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      });
  };

  render() {
    const { images, status } = this.state;

    // if (status === 'idle') {
    //   return <div>Починай шукати</div>;
    // }

    if (status === 'pending') {
      return (
        <>
          {this.props.query && (
            <Gallery>
              {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  webImg={webformatURL}
                  tags={tags}
                  onImageClick={() =>
                    this.props.onImageClick(largeImageURL, tags)
                  }
                />
              ))}
            </Gallery>
          )}
          <Loader />
        </>
      );
    }

    // if (status === 'rejected') {
    //   return <div>Все пропало</div>;
    // }

    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webImg={webformatURL}
                tags={tags}
                onImageClick={() =>
                  this.props.onImageClick(largeImageURL, tags)
                }
              />
            ))}
          </Gallery>
          <Button onClick={this.fetchImages} />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onImageClick: PropTypes.func,
};
