import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import checkCircle from '../../assets/svg/check-circle.svg';
import errorClose from '../../assets/svg/icon-error-close.svg';

import './toast-successful.scss';

function ToastSuccessful({ handlerToastClose }) {
  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => {
      document.body.classList.remove('no__scroll');
    };
  }, []);
  const { success, successChange, successDelete } = useSelector((state) => state.post);
  const { successReviews } = useSelector((state) => state.book);

  return (
    <div className='toast-modal ' data-test-id='error'>
      <div className='toast-successful__item '>
        <button type='button' className='toast__btn-play toast__btn-error'>
          <img src={checkCircle} alt='toast' />
        </button>
        <div className='toast__text '>
          {success
            ? ' Книга забронирована. Подробности можно посмотреть на странице Профиль'
            : successReviews
            ? 'Спасибо, что нашли время оценить книгу!'
            : successDelete
            ? 'Бронирование книги успешно отменено!'
            : successChange
            ? 'Изменения успешно сохранены!'
            : ''}
        </div>
      </div>
      <button data-test-id='alert-close' type='button' onClick={handlerToastClose} className='toast__btn-next'>
        <img src={errorClose} alt='toast-close' />
      </button>
    </div>
  );
}

export { ToastSuccessful };
