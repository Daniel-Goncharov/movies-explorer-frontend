import './Login.css';
import CustomInput from '../../CustomInput/CustomInput';
import Logo from '../../Logo/Logo';
import useFormAndValidation from '../../../vendor/hooks/useFormAndValidation';
import Button from '../../Button/Button';
import { Link, Navigate, useLocation } from 'react-router-dom';


export default function Login({ handleLogin, isLoggedIn, isFetching }) {
  let location = useLocation();
  const {values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = values;
    handleLogin({ email, password });
  }

  if (isLoggedIn) {
    return <Navigate to='/movies' state={{ from: location }} replace />;
  }

  return (
    <section className="login">
      <Link to="/">
        <Logo/>
      </Link>
      <form name="signin" method="post" onSubmit={handleSubmit} className="form">
        <h1 className="form__title">Рады видеть!</h1>
        <CustomInput
          name="email"
          placeholder="E-mail"
          readOnly={isFetching && true}
          handler={handleChange}
          min="2"
          max="30"
          pattern='^.+@.+\..+$'
          errorText={errors.email}
          value={values.email ? values.email : ''}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Пароль"
          readOnly={isFetching && true}
          value={values.password ? values.password : ''}
          handler={handleChange}
          min="6"
          errorText={errors.password}
        />
        <Button
          disabled={!isValid || isFetching ? true : false}
          className={
            !isValid || isFetching
              ? "submit-button submit-button_type_login submit-button_disabled"
              : "submit-button submit-button_type_login"
          }
          type="submit"
        >
          {isFetching ? 'Загрузка...' : 'Войти'}
        </Button>
        <div className="form__footer">
          Ещё не зарегистрированы? <Link to={'/signup'} className="form__link">Регистрация</Link>
        </div>
      </form>
    </section>
  )
}