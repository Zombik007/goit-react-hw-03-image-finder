import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const lightboxRoot = document.querySelector('#lightbox-root');

export default class Lightbox extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div
        className={styles.Lightbox__backdrop}
        onClick={this.handleBackdropClick}
      >
        <div className={styles.Lightbox__content}>{this.props.children}</div>
      </div>,
      lightboxRoot,
    );
  }
}
