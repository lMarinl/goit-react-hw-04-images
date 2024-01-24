import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  pictures,
  // modalData,
  handleShowModalWindow,
}) => {
  return (
    <>
      {pictures?.map(picture => {
        return (
          <li className={css.ImageGalleryItem} key={picture.id}>
            <img
              className={css.ImageGalleryItemImage}
              src={picture.webformatURL}
              alt="img"
              onClick={() => {
                handleShowModalWindow(picture.largeImageURL);
              }}
            />
          </li>
        );
      })}
    </>
  );
};
