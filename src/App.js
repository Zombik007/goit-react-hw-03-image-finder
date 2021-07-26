import React, { Component } from 'react';
// import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from 'react-toastify';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  state = {
    imageName: '',
    showLightbox: false,
    modalUrl: '',
    modalAlt: '',
  };

  toggleLightbox = () => {
    this.setState(({ showLightbox }) => ({
      showLightbox: !showLightbox,
    }));
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  modalContent = (url, alt) => {
    this.setState({ modalUrl: url, modalAlt: alt });
  };

  render() {
    const { showLightbox } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageName={this.state.imageName}
          openModal={this.toggleLightbox}
          modalContent={this.modalContent}
        />

        {showLightbox && (
          <Modal onClose={this.toggleLightbox} modalContent={this.modalContent}>
            <img src={this.state.modalUrl} alt={this.state.modalAlt} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
