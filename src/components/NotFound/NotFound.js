import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const history = useNavigate();
  return (
    <>
      <div className="not-found">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__message">Страница не найдена</p>
        <button
          type="button"
          onClick={() => history(-1)}
          className="not-found__button"
        >
          Назад
        </button>
        </div>
    </>
  );
};