import './CustomInput.css';

export default function CustomInput ({ type = 'text', name, placeholder, value = '', handler, min, max, required = true, errorText = '' }) {
  return (
    <label className="custom-input">
      <span className="custom-input__label">{placeholder}</span>
      <input
        type={type}
        name={name}
        onInput={handler}
        value={value}
        minLength={min}
        maxLength={max}
        required={required}
        className={`custom-input__input ${errorText && 'custom-input__input_has-error'}`}
      />
      {errorText && <span className="custom-input__error">{errorText}</span>}
    </label>
  );
};
