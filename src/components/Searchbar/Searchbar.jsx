import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          required
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
