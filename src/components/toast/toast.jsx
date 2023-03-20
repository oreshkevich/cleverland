import error from '../../assets/svg/icon-error.svg';
import errorClose from '../../assets/svg/icon-error-close.svg';

import './toast.scss';

function Toast() {
  return (
    <div className='container '>
      <div className='toast' data-test-id='error'>
        <div className='toast__wrapper '>
          <div className='toast__item '>
            <button type='button' className='toast__btn-play toast__btn-error'>
              <img src={error} alt='toast' />
            </button>
            <div className='toast__text '>Что-то пошло не так. Обновите страницу через некоторое время.</div>
          </div>
          <div className='toast__item toast__btn-close'>
            <button type='button' className='toast__btn-next'>
              <img src={errorClose} alt='toast-close' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Toast };
