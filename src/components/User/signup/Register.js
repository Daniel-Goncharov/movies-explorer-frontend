import './Register.css';
import {useEffect} from 'react';
import { useNavigate } from 'react-router';
import CustomInput from '../../CustomInput/CustomInput';
import Logo from '../../Logo/Logo';
import useFormAndValidation from '../../../vendor/hooks/useFormAndValidation';
import Button from '../../Button/Button';
import { Link } from 'react-router-dom';


export default function Login() {
  const history = useNavigate();
  const {values, handleChange, errors, isValid, setValues } = useFormAndValidation();

  useEffect(() => {
    setValues({
      name: 'Виталий',
      email: 'pochta@yandex.ru',
      password: 'password',
    });
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      history('/signin');
    }
  }

  return (
    <section className='regisrer'>
      <Logo/>
      <form name="signup" method="post" onSubmit={handleSubmit} className='auth__form'>
        <h1 className='form__title'>Добро пожаловать!</h1>
        <CustomInput
          name="name"
          placeholder="Имя"
          handler={handleChange}
          min="2"
          max="30"
          errorText={errors.name}
          value={values.name}
        />
        <CustomInput
          name="email"
          placeholder="E-mail"
          value={values.email}
          handler={handleChange}
          min="2"
          max="30"
          errorText={errors.email}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Пароль"
          value={values.password}
          handler={handleChange}
          min="8"
          errorText={errors.password}
        />
        <Button type="submit" className="submit-button submit-button_type_regisrer">Зарегистрироваться</Button>
        <div className="form__footer">
        Уже зарегистрированы? <Link to={'/signin'} className="form__link">Войти</Link>
        </div>
      </form>
    </section>
  )
}