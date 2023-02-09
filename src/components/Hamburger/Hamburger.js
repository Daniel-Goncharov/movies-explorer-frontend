import './Hamburger.css';

export default function Hamburger({ onClick, isActive }) {
  return (
    <button
      className={`hamburger ${isActive ? 'hamburger_open' : 'hamburger_close'}`}
      onClick={onClick}
      type="button"
    >
      <span></span>
    </button>
  );
};