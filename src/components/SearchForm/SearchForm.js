import './SearchForm.css';
import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Button from '../Button/Button';

function SearchForm({
  isShort,
  setIsShort,
  onSearch,
  inputValue,
  setInputValue
}) {
  const [emptyInputError, setEmptyInputError] = useState(false);

  // Двустороннее связывание инпута
  const handleSearchInput = (evt) => {
    setInputValue(evt.target.value);
  };

  // Переключение чекбокса
  const handleCheckbox = () => {
    setIsShort(!isShort);
  };

  // Обработка клика по кнопке поиска
  const handleSearch = (evt) => {
    evt.preventDefault();
    if (!inputValue) {
      setEmptyInputError(true);
    } else {
      setEmptyInputError(false);
      onSearch(inputValue);
    }
  };

  return (
    <div className="search-form-wrap">
      <form name="search" method="get" className="search-form">
        <div className="search-form__input-wrap">
          <div className="search-form__icon"/>
          <input
            type="text"
            name="query"
            placeholder={emptyInputError ? 'Нужно ввести ключевое слово' : 'Фильм'}
            className={`search-form__input ${emptyInputError && 'search-form__input-error'}`}
            required
            onChange={handleSearchInput}
            value={inputValue}
          />
          <Button
              type="submit"
              className="search-form__button"
              onClick={handleSearch}
            />
          <div className="vertical-decoration-line"/>
        </div>
        <FilterCheckbox
          name="short"
          type='checkbox'
          checked={isShort}
          onChange={handleCheckbox}
          label="Короткометражки"
        />
      </form>
    </div>
  );
};

export default React.memo(SearchForm);