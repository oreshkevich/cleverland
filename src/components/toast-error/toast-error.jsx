import { useEffect } from 'react';

import iconError from '../../assets/svg/icon-error.svg';
import errorClose from '../../assets/svg/icon-error-close.svg';

import './toast-error.scss';

function ToastError({ message, close, closeParent }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
      if (closeParent) closeParent();
    }, 4000);

    return () => clearTimeout(timer);
  }, [close, closeParent]);

  return (
    <div className='toast-error-modal ' data-test-id='error'>
      <div className='toast-error__item '>
        <button type='button' className='toast-error__btn-play toast-error__btn-error'>
          <img src={iconError} alt='toast-error' />
        </button>
        <div className='toast__text '>{message}</div>
      </div>
      <div className='toast-error__item toast-error__btn-close'>
        <button
          data-test-id='alert-close'
          type='button'
          className='toast-error__btn-next'
          onClick={() => {
            close();
            if (closeParent) closeParent();
          }}
        >
          <img src={errorClose} alt='toast-error-close' />
        </button>
      </div>
    </div>
  );
}

export { ToastError };
