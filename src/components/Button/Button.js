import React from 'react';
import './Button.css';

export default function Button({ className = '', onClick, children, type = 'button' }) {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};