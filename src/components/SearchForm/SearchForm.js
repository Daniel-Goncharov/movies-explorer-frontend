import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Button from '../Button/Button';

export default function SearchForm() {
  function handleChange(e) {
  }

  return (
    <div className="search-form-wrap">
      <form name="search" method="get" className="search-form">
        <div className="search-form__input-wrap">
          <div className='search-form__icon'/>
          <input type="text" name="query" placeholder="Фильм" className="search-form__input" />
          <Button type="submit" className="search-form__button"/>
          <div className='vertical__decoration-line'/>
        </div>
        <FilterCheckbox name="short" checked={true} label="Короткометражки" handler={handleChange} />
      </form>
    </div>
  );
};