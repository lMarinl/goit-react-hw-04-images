import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({
  pictures,
  // modalData,
  handleShowModalWindow,
}) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem
        pictures={pictures}
        // modalData={modalData}
        handleShowModalWindow={handleShowModalWindow}
      />
    </ul>
  );
};
