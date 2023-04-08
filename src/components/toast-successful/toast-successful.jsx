import { useEffect } from 'react';

import checkCircle from '../../assets/svg/check-circle.svg';
import errorClose from '../../assets/svg/icon-error-close.svg';

import './toast-successful.scss';

function ToastSuccessful({ message, close, closeParent }) {
  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => {
      document.body.classList.remove('no__scroll');
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      close();
      if (closeParent) closeParent();
    }, 4000);

    return () => clearTimeout(timer);
  }, [close, closeParent]);

  return (
    <div className='toast-modal ' data-test-id='error'>
      <div className='toast-successful__item '>
        <button type='button' className='toast__btn-play toast__btn-error'>
          <img src={checkCircle} alt='toast' />
        </button>
        <div className='toast__text '>{message}</div>
      </div>
      <button
        data-test-id='alert-close'
        type='button'
        className='toast__btn-next'
        onClick={() => {
          close();
          if (closeParent) closeParent();
        }}
      >
        <img src={errorClose} alt='toast-close' />
      </button>
    </div>
  );
}

export { ToastSuccessful };
