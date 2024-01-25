import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({
  pictures,

  handleShowModalWindow,
}) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem
        pictures={pictures}
        handleShowModalWindow={handleShowModalWindow}
      />
    </ul>
  );
};
