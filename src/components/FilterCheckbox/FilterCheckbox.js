import './FilterCheckbox.css';
import { useState } from 'react';

export default function FilterCheckbox({ handler, name, checked, label }) {
  const [isChecked, setIsChecked] = useState(checked);

  function handleChange(evt) {
    setIsChecked(!isChecked);
    handler(evt);
  }

  return (
    <label className="filter-checkbox">
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={handleChange}
        className="filter-checkbox__source"
      />
      <span className={`filter-checkbox__custom ${isChecked && 'filter-checkbox__custom_active'}`}/>
      <span className="filter-checkbox__label">{label}</span>
    </label>
  );
};