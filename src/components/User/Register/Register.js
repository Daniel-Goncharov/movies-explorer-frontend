import { Link, Navigate, useLocation } from 'react-router-dom';
import useFormAndValidation from '../../../vendor/hooks/useFormAndValidation';
import './Register.css';
import CustomInput from '../../CustomInput/CustomInput';
import Logo from '../../Logo/Logo';
import Button from '../../Button/Button';


export default function Login({ handleRegister, isLoggedIn, isFetching }) {
  let location = useLocation();
  const {values, handleChange, errors, isValid } = useFormAndValidation();

function handleSubmit(evt) {
  evt.preventDefault();
  const { name, email, password } = values;
  handleRegister({ name, email, password });
};

if (isLoggedIn) {
  return <Navigate to="/movies" state={{ from: location }} replace />;
}

  return (
    <section className="regisrer">
      <Link to="/">
        <Logo/>
      </Link>
      <form name="signup" method="post" onSubmit={handleSubmit} className="form">
        <h1 className="form__title">Добро пожаловать!</h1>
        <CustomInput
          name="name"
          placeholder="Имя"
          type="text"
          readOnly={isFetching && true}
          handler={handleChange}
          min="2"
          max="30"
          pattern="^(?!\s)[A-Za-zА-Яа-я\-\s]+$"
          errorText={errors.name}
          value={values.name ? values.name : ""}
        />
        <CustomInput
          name="email"
          placeholder="E-mail"
          type="email"
          readOnly={isFetching && true}
          handler={handleChange}
          min="2"
          max="30"
          pattern="^.+@.+\..+$"
          errorText={errors.email}
          value={values.email ? values.email : ""}
        />
        <CustomInput
          name="password"
          placeholder="Пароль"
          type="password"
          readOnly={isFetching && true}
          handler={handleChange}
          min="6"
          errorText={errors.password}
          value={values.password ? values.password : ""}
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
          {isFetching ? "Загрузка..." : "Зарегистрироваться"}
        </Button>
        <div className="form__footer">
          Уже зарегистрированы?
          <Link
            to={"/signin"}
            className="form__link"
          >
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};