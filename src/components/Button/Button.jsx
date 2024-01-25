import css from './Button.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <div className={css.containerButton}>
      <button className={css.Button} type="button" onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
};
