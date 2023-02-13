import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Button from '../Button/Button';

export default function SearchForm({ togleShortFilter }) {

  return (
    <>
      <div className="search-form-wrap">
        <form name="search" method="get" className="search-form">
          <div className="search-form__input-wrap">
            <div className="search-form__icon"/>
            <input type="text" name="query" placeholder="Фильм" className="search-form__input" required/>
            <Button type="submit" className="search-form__button"/>
            <div className="vertical-decoration-line"/>
          </div>
          <FilterCheckbox name="short" checked={false} label="Короткометражки" handler={togleShortFilter} />
        </form>
      </div>
      <span className="search-form__resalt-null">По вашему запросу ничего не найдено</span>
    </>
  );
};