import './password-error.scss';

function PasswordError({ handleClickError }) {
  return (
    // <div className='block-form block-form_center'>
    <div data-test-id='status-block'>
      <h3 className='block-form__title'>Данные не сохранились</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>Что-то пошло не так. Попробуйте ещё раз</p>
        <button type='button' onClick={handleClickError} className='item-form__btn item-form__btn_error'>
          повторить
        </button>
      </div>
    </div>
    // </div>
  );
}

export { PasswordError };
