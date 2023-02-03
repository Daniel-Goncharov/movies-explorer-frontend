import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <div className="container">
        <div className="error">
          <div className="error_code">404</div>
          <div className="error_message">Страница не найдена</div>
        </div>
      </div>
    </>
  )
}