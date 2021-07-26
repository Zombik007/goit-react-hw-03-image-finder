import React, { Component } from 'react';
import { toast } from 'react-toastify';

import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import ImagesApiService from '../../services/apiService';
import Button from '../Button';
import Loader from '../Loader';

const imageApiService = new ImagesApiService();

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ status: 'pending', loading: true });

      imageApiService.query = this.props.imageName;
      imageApiService
        .fetchImagesApi()
        .then(image => {
          if (image.length === 0) {
            toast.warning(
              `Sorry for your request ${this.props.imageName}, no results were found.`,
              {
                position: 'top-right',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              },
            );
            this.setState({
              error: `Sorry for your request ${this.props.imageName}, no results were found.`,
              loading: true,
              status: 'rejected',
            });
            return;
          } else {
            this.setState({
              images: image,
              status: 'resolved',
              loading: true,
            });
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  handleButtonClick = () => {
    const scrollTo = document.documentElement.scrollHeight - 141;
    imageApiService
      .fetchImagesApi()
      .then(image => {
        this.setState(prevState => ({
          loading: !prevState.loading,
          images: [...prevState.images, ...image],
        }));
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth',
        });
      })
      .finally(
        this.setState(prevState => ({
          loading: !prevState.loading,
        })),
      );
  };

  render() {
    const { images, status, error, loading } = this.state;
    if (status === 'idle') {
      return (
        <div
          style={{
            textAlign: 'center',
            fontSize: '18px',
          }}
        >
          Enter what picture you want to find
        </div>
      );
    }

    if (status === 'pending') {
      imageApiService.resetPage();
      return (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Loader />
        </div>
      );
    }

    if (status === 'rejected') {
      imageApiService.resetPage();
      return (
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          {error}
        </h2>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={styles.ImageGallery}>
            <ImageGalleryItem
              image={images}
              openModal={this.props.openModal}
              modalContent={this.props.modalContent}
            />
          </ul>
          {loading ? (
            <Button onClick={this.handleButtonClick}>Load more</Button>
          ) : (
            <Loader />
          )}
        </>
      );
    }
  }
}
