import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import iconError from '../../assets/svg/icon-error.svg';
import errorClose from '../../assets/svg/icon-error-close.svg';

import './toast-error.scss';

function ToastError({ handlerToastClose }) {
  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => {
      document.body.classList.remove('no__scroll');
    };
  }, []);
  const { error, errorChange, errorDelete } = useSelector((state) => state.post);
  const { errorReviews } = useSelector((state) => state.book);

  return (
    <div className='toast-error-modal ' data-test-id='error'>
      <div className='toast-error__item '>
        <button type='button' className='toast-error__btn-play toast-error__btn-error'>
          <img src={iconError} alt='toast-error' />
        </button>
        <div className='toast__text '>
          {error
            ? 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'
            : errorReviews
            ? 'Оценка не была отправлена. Попробуйте позже!'
            : errorDelete
            ? 'Не удалось снять бронирование книги. Попробуйте позже!'
            : errorChange
            ? 'Изменения не были сохранены. Попробуйте позже!'
            : 'Что-то пошло не так. Обновите страницу через некоторое время.'}
        </div>
      </div>
      <div className='toast-error__item toast-error__btn-close'>
        <button data-test-id='alert-close' type='button' onClick={handlerToastClose} className='toast-error__btn-next'>
          <img src={errorClose} alt='toast-error-close' />
        </button>
      </div>
    </div>
  );
}

export { ToastError };
