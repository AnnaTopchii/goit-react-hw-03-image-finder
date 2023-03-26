import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const API_KEY = '33639596-28aa77ea2f93f41ef738293ad';
const BASE_URL = 'https://pixabay.com/api/';
const PARAM = 'image_type=photo&orientation=horizontal&per_page=12';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      fetch(
        `${BASE_URL}?key=${API_KEY}&q=${nextQuery}&${PARAM}&page=${this.state.page}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`No images ${nextQuery}`));
        })
        .then(response =>
          this.setState({ images: response.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  // incrementPage() {
  //   this.state.page += 1;
  // }

  // resetPage() {
  //   this.state.page = 1;
  // }

  render() {
    const { images, error, status } = this.state;
    console.log(images);

    if (status === 'idle') {
      return <div>Enter any word to search images</div>;
    }

    if (status === 'pending') {
      return <div>Spiner</div>;
    }

    if (status === 'rejected') {
      return <div> {error.message} </div>;
    }

    if (status === 'resolved') {
      return (
        <Gallery>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webImg={webformatURL}
              largeImg={largeImageURL}
              tags={tags}
            />
          ))}
        </Gallery>
      );
    }
  }
}
