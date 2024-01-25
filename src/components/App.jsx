import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

import { searchPicture } from 'services/API';
import { STATUS } from 'utils/utils';
import { toast } from 'react-toastify';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState(STATUS.idle);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (!search) {
      return;
    }

    fetchPictureByQuery(search, page);
  }, [search, page]);

  const fetchPictureByQuery = async (search, page) => {
    try {
      setStatus(STATUS.pending);

      const { hits, totalHits } = await searchPicture(search, page);
      if (page === 1 && totalHits) {
        toast(`Hooray! We found ${totalHits} images!`);
      }
      setPictures(prevState => [...prevState, ...hits]);
      setStatus(STATUS.success);
      setTotalHits(totalHits);
    } catch (error) {
      setError(error.message);
      setStatus(STATUS.error);
    }
  };

  const handelSubmit = event => {
    event.preventDefault();
    const searchValue = event.currentTarget.search.value.trim().toLowerCase();

    setSearch(searchValue);
    setPage(1);
    setPictures([]);
    setTotalHits(0);
    event.currentTarget.reset();
  };

  const handleShowModalWindow = largeImageUrl => {
    setModalData(largeImageUrl);
    setIsOpenModal(true);
  };

  const handleCloseModalWindow = () => {
    setIsOpenModal(false);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const showPicturesEmpty =
    status === STATUS.success &&
    Array.isArray(pictures) &&
    pictures.length === 0;

  const ShowButton = status === STATUS.success && pictures.length !== totalHits;
  return (
    <>
      <Searchbar onSubmit={handelSubmit} />

      {status === STATUS.error && <p>Oops</p>}
      {showPicturesEmpty && <p>You still don't have any picture!</p>}

      {pictures.length > 0 && (
        <ImageGallery
          pictures={pictures}
          handleShowModalWindow={handleShowModalWindow}
        />
      )}
      {status === STATUS.pending && <Loader />}

      {ShowButton && <Button handleLoadMore={handleLoadMore} />}
      {isOpenModal && (
        <Modal
          modalData={modalData}
          handleCloseModalWindow={handleCloseModalWindow}
        />
      )}
    </>
  );
};
