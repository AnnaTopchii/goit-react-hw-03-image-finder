import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
        <Button />
        {/* <Modal /> */}
        <ToastContainer />
      </Container>
    );
  }
}

// https://github.com/luxplanjay/react-21-22/tree/06-http-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D1%8B/src/components
