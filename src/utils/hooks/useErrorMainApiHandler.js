import { useState } from "react";
import fetchIsFail from '../../images/Badrequest.svg';

export default function useErrorMainApiHandler() {
  const [isInfoToolTipActive, setIsInfoToolTipActive] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState({ image: '', caption: '' });
  const [isFetching, setIsFetching] = useState(false);
  const [maimApiError, setMaimApiError] = useState('');

  const errorHandler = (err) => {
    console.log(`Ошибка: ${err}`);
    setIsFetching(false);
    setIsInfoTooltipMessage({
      image: fetchIsFail,
      caption:
        err === 401
          ? 'Почта или пароль не верные'
          : err === 400
          ? 'Пользователя с такой почтой не существует'
          : err === 409
          ? 'Пользователь с указанной почтой уже существует'
          : err === 500
          ? 'Ошибка сервера, попробуйте ещё раз чуть позже'
          : '',
    });
    setIsInfoToolTipActive(true);
    setMaimApiError(err);
  };

  return {
    isInfoToolTipActive,
    setIsInfoToolTipActive,
    isInfoTooltipMessage,
    setIsInfoTooltipMessage,
    isFetching,
    setIsFetching,
    maimApiError,
    setMaimApiError,
    errorHandler
  }
}

