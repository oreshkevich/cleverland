import './login-errors.scss';

function LoginErrors({ handleClickError }) {
  return (
    <div data-test-id='status-block'>
      <h3 className='block-form__title'>Вход не выполнен</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>Что-то пошло не так. Попробуйте ещё раз</p>
        <button type='button' className='item-form__btn ' onClick={handleClickError}>
          повторить
        </button>
      </div>
    </div>
  );
}

export { LoginErrors };
