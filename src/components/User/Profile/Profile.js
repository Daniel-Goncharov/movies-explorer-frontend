import './Profile.css';
import {useEffect, useState} from 'react';
import Header from '../../Layout/Header/Header';
import MyInput from '../../CustomInput/CustomInput';
import Button from '../../Button/Button';
import {useNavigate} from 'react-router-dom';
import useFormAndValidation from '../../../vendor/hooks/useFormAndValidation';

export default function ProfilePage() {
  const user = {
    name: 'Виталий',
    email: 'pochta@yandex.ru',
  }

  const history = useNavigate();
  const {values, handleChange, errors, isValid, setValues } = useFormAndValidation();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setValues({
      email: 'pochta@yandex.ru',
      name: 'Виталий',
    });
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      setIsEditable(false);
    }
  }

  function handleEdit(evt) {
    evt.preventDefault();
    setIsEditable(true);
  }

  function handleSignOut(evt) {
    evt.preventDefault();
    history('/');
  }

  return (
    <>
      <Header isLoggedIn={true}/>
        <main className="profile">
          <form className="profile__form" onSubmit={handleSubmit}>
            <h1 className="profile__title">Привет, {user.name}!</h1>
            {isEditable ?
              (<div className="profile__inputs-group">
                <MyInput
                  name="name"
                  placeholder="Имя"
                  handler={handleChange}
                  min="2"
                  max="30"
                  errorText={errors.name}
                  value={values.name}
                />
                <MyInput
                  name="email"
                  placeholder="E-mail"
                  handler={handleChange}
                  min="2"
                  max="30"
                  value={values.email}
                  errorText={errors.email}
                />
              </div>)
              : (<ul className="profile__list">
                    <li className="profile__list-item">
                      <span>Имя</span>
                      <span>{user.name}</span>
                    </li>
                    <li className="profile__list-item">
                      <span>E-mail</span>
                      <span>{user.email}</span>
                    </li>
                </ul>)
            }
              {isEditable ? <div className="profile__buttons-group-edit">
                              <span className="profile__error">При обновлении профиля произошла ошибка.</span>
                              <Button type="submit" className="profile__button profile__button_type_save">Сохранить</Button>
                            </div>
                          : <div className="profile__buttons-group">
                              <Button className="profile__button" onClick={handleEdit}>Редактировать</Button>
                              <Button className="profile__button profile__button_type_signout" onClick={handleSignOut}>Выйти из аккаунта</Button>
                            </div>
              }
          </form>
      </main>
    </>
  );
}
