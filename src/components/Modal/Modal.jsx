import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.handleCloseModalWindow();
    }
  };

  handelKeyPress = event => {
    if (event.code === 'Escape') {
      this.props.handleCloseModalWindow();
    }
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handelKeyPress);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handelKeyPress);
  }

  render() {
    const { modalData } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal}>
          <img src={modalData} alt="img" />
        </div>
      </div>
    );
  }
}
