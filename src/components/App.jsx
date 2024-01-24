import { Component } from 'react';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

import { searchPicture } from 'services/API';
import { STATUS } from 'utils/utils';

export class App extends Component {
  state = {
    pictures: [],
    status: STATUS.idle,
    error: null,
    search: '',
    page: 1,
    totalHits: null,
    modalData: null,
    isOpenModal: false,
    showLoadMore: false,
  };

  fetchPictureByQuery = async (search, page) => {
    try {
      this.setState({ status: STATUS.pending });

      const { hits, totalHits } = await searchPicture(search, page);

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits],
        status: STATUS.success,
        totalHits,
        showLoadMore: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.error });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.search !== prevState.search ||
      this.state.page !== prevState.page
    ) {
      this.fetchPictureByQuery(this.state.search, this.state.page);
    }
  }

  handelSubmit = event => {
    event.preventDefault();
    const searchValue = event.currentTarget.search.value.trim().toLowerCase();
    this.setState({ search: searchValue, page: 1, pictures: [] });

    // event.currentTarget.reset();
  };

  handleShowModalWindow = largeImageUrl => {
    this.setState({ modalData: largeImageUrl, isOpenModal: true });
    console.log(this.modalData);
    console.log(largeImageUrl);
  };

  handleCloseModalWindow = () => {
    this.setState({ isOpenModal: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { pictures, status, totalHits, isOpenModal, modalData } = this.state;

    const showPicturesEmpty =
      status === STATUS.success &&
      Array.isArray(pictures) &&
      pictures.length === 0;

    const ShowButton =
      status === STATUS.success && pictures.length !== totalHits;

    return (
      <>
        <Searchbar onSubmit={this.handelSubmit} />
        {status === STATUS.pending && <Loader />}
        {status === STATUS.error && <p>Oops</p>}
        {showPicturesEmpty && <p>You still don't have any picture!</p>}

        {pictures.length > 0 && (
          <ImageGallery
            pictures={pictures}
            // modalData={modalData}
            handleShowModalWindow={this.handleShowModalWindow}
          />
        )}
        {ShowButton && <Button handleLoadMore={this.handleLoadMore} />}
        {isOpenModal && (
          <Modal
            modalData={modalData}
            handleCloseModalWindow={this.handleCloseModalWindow}
          />
        )}
      </>
    );
  }
}
