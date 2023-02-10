import './Hamburger.css';

export default function Hamburger({ onClick, isActive }) {
  return (
    <button
      className={`hamburger ${isActive ? 'hamburger_type_open' : 'hamburger_type_close'}`}
      onClick={onClick}
      type="button"
    >
      <span></span>
    </button>
  );
};