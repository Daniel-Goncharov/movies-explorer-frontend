import './FilterCheckbox.css';

export default function FilterCheckbox({ name, type, checked, onChange, label }) {
  return (
    <label className="filter-checkbox">
      <input
        name={name}
        type={type}
        checked={checked}
        onChange={onChange}
        className="filter-checkbox__source"
      />
      <span className={`filter-checkbox__custom ${checked && 'filter-checkbox__custom_active'}`}/>
      <span className="filter-checkbox__label">{label}</span>
    </label>
  );
};