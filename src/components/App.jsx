import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    selectedImage: null,
    alt: null,
    showModal: false,
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  handleImageClick = (largeImageUrl, tags) => {
    this.setState({
      showModal: true,
      selectedImage: largeImageUrl,
      alt: tags,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { query, showModal, selectedImage, alt } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={query} onImageClick={this.handleImageClick} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImage} alt={alt} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </Container>
    );
  }
}
