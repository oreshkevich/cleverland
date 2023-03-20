import './request-post.scss';

function RequestPost({ handleResendingData }) {
  return (
    <div className='block-form_center' data-test-id='status-block'>
      <h3 className='block-form__title'>Данные не сохранились</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>
          Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз
        </p>
        <button type='button' className='item-form__btn ' onClick={handleResendingData}>
          повторить
        </button>
      </div>
    </div>
  );
}

export { RequestPost };
