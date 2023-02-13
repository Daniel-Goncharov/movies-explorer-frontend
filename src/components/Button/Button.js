import React from 'react';

export default function Button({ className = '', onClick, children, type }) {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};