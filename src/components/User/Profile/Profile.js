import './Profile.css';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import Header from '../../Layout/Header/Header';
import useFormAndValidation from '../../../vendor/hooks/useFormAndValidation';

export default function ProfilePage({
  isLoggedIn,
  isMobileMenuActive,
  onOpenMenu,
  onClose,
  handleLogOut,
  handleEditProfile,
  isFetching,
  setIsFetching
}) {
  const {values, handleChange, errors, isValid, setValues } = useFormAndValidation();

  useEffect(() => {
    setIsFetching(false);
  }, [setIsFetching]);

  // Подписывает на контекст CurrentUserContext
  const { currentUser } = useContext(CurrentUserContext);

  // Устанавливает данные currentUser в инпуты
  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser.name, currentUser.email]);

  // Обработчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email } = values;
    handleEditProfile({ name, email });
  }

  // Управляет состоянием кнопки отправки формы
  const isButtonAble =
    isValid &&
    (values.name !== currentUser.name || values.email !== currentUser.email);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose}/>
      <main className='profile'>
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
          <ul className='profile__input-list'>
            <li className='profile__input-item'>
              <span className='profile__input-label'>Имя</span>
              <input
                className={`profile__input ${errors.name && 'profile__input_error'}`}
                readOnly={isFetching && true}
                id='profile__input-name'
                type='text'
                required
                minLength='2'
                maxLength='30'
                pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$'
                name='name'
                onChange={handleChange}
                value={values.name ? values.name : ''}
              />
              <span id='error-profile-name' className='profile__error'>
                {errors.name}
              </span>
            </li>
            <li className='profile__input-item'>
              <span className='profile__input-label'>E-mail</span>
              <input
                className={`profile__input ${errors.name && 'profile__input_error'}`}
                readOnly={isFetching && true}
                id='profile__input-email'
                type='email'
                pattern='^.+@.+\..+$'
                name='email'
                onChange={handleChange}
                value={values.email ? values.email : ''}
                required
              />
              <span id='error-profile-name' className='profile__error'>
                {errors.email}
              </span>
            </li>
          </ul>
          <div className='profile__buttons'>
            <button
              disabled={!isButtonAble || isFetching ? true : false}
              className={
                !isButtonAble || isFetching
                  ? 'profile__button-edit profile__button-edit_disabled'
                  : 'profile__button-edit'
              }
              onClick={handleSubmit}
            >
              Редактировать
            </button>
            <button
              className='profile__button-logout'
              onClick={handleLogOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </main>
  </>
  );
}
