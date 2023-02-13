import React from 'react';
import './InfoToolTip.css';

export default function InfoToolTip({ isInfoToolTipActive, onClose, caption, image }) {
  return (
    <div
      className={`info-tooltip ${isInfoToolTipActive && 'info-tooltip_opened'}`}
      onClick={onClose}
    >
      <div className='info-tooltip__container' onClick={(evt) => evt.stopPropagation()}>
        <button
          className='info-tooltip__close-button'
          onClick={onClose}
        ></button>
        <img className='info-tooltip__img' src={image} alt='Ошибка запроса' />
        <p className='info-tooltip__caption'>{caption}</p>
        <button className='info-tooltip__ok-button' onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}