import css from './Button.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <button className={css.Button} type="button" onClick={handleLoadMore}>
      Load More
    </button>
  );
};
