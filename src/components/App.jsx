import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import api from 'services/api';

import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    totalImages: 0,
    currentPage: 1,

    modalData: null,

    selectedImage: null,
    alt: null,
    showModal: false,

    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const { query, currentPage } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, images: [], currentPage: 1 });
  };

  fetchImages = () => {
    const { currentPage, query } = this.state;
    const options = { query, currentPage };

    this.setState({ status: 'pending' });

    api
      .fetchImages(options)
      .then(({ images, totalImages }) => {
        if (totalImages === 0) {
          this.setState({ status: 'idle' });
          return toast.error(`Sorry, we didn't find any pictures of ${query}`);
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          totalImages,
          status: 'resolved',
        }));
      })
      .catch(error => {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      });
  };

  loadMore = () =>
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));

  toggleModal = (modalData = null) => {
    this.setState({
      modalData: modalData,
    });
  };

  render() {
    const { modalData, images, status, totalImages } = this.state;

    const showButton = status === 'resolved' && totalImages !== images.length;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.toggleModal} />
        )}

        {showButton && <Button onClick={this.loadMore} />}

        {status === 'pending' && <Loader />}

        {modalData && (
          <Modal onClose={this.toggleModal}>
            <img src={modalData.largeImageURL} alt={modalData.tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </Container>
    );
  }
}
