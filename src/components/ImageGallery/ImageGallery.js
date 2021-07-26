import React, { Component } from 'react';
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
          this.setState({
            images: image,
            status: 'resolved',
            loading: true,
          });
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
      return <h2>{error.message}</h2>;
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
