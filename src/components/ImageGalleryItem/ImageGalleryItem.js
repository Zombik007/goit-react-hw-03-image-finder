import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  onImageClick = e => {
    this.props.modalContent(e.target.dataset.url, e.target.alt);
    this.props.openModal();
  };

  render() {
    return (
      <>
        {this.props.image.map(({ webformatURL, tags, id, largeImageURL }) => {
          return (
            <li key={id} className={styles.ImageGalleryItem}>
              <img
                src={webformatURL}
                alt={tags}
                className={styles.ImageGalleryItem__image}
                data-url={largeImageURL}
                onClick={this.onImageClick}
              />
            </li>
          );
        })}
      </>
    );
  }
}
