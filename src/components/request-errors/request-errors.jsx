import './request-errors.scss';

function RequestErrors({ handleClickError }) {
  return (
    <div data-test-id='status-block'>
      <h3 className='block-form__title block-form__title_letter'>Данные не сохранились</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>
          Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail
        </p>
        <button type='button' className='item-form__btn ' onClick={handleClickError}>
          назад к регистрации
        </button>
      </div>
    </div>
  );
}

export { RequestErrors };
