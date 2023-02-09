import './Login.css';
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
      email: 'pochta@yandex.ru',
      password: 'password',
    });
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      history('/movies');
    }
  }

  return (
    <section className="login">
      <Link to="/">
        <Logo/>
      </Link>
      <form name="signin" method="post" onSubmit={handleSubmit} className="auth__form">
        <h1 className="form__title">Рады видеть!</h1>
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
        <Button type="submit" className="submit-button submit-button_type_login">Войти</Button>
        <div className="form__footer">
          Ещё не зарегистрированы? <Link to={'/signup'} className="form__link">Регистрация</Link>
        </div>
      </form>
    </section>
  )
}