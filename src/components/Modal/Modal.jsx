import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ modalData, handleCloseModalWindow }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handelKeyPress);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handelKeyPress);
    };
  });

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      handleCloseModalWindow();
    }
  };

  const handelKeyPress = event => {
    if (event.code === 'Escape') {
      handleCloseModalWindow();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={modalData} alt="img" />
      </div>
    </div>
  );
};
