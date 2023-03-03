import './Hamburger.css';

export default function Hamburger({ onClick, isMobileMenuActive }) {
  return (
    <button
      className={`hamburger ${isMobileMenuActive ? 'hamburger_type_open' : 'hamburger_type_close'}`}
      onClick={onClick}
      type="button"
    >
      <span></span>
    </button>
  );
};