import { useNavigate } from 'react-router-dom';

import './registration-successful.scss';

function RegistrationSuccessful() {
  const navigate = useNavigate();
  const onClickNavigate = () => {
    navigate('/auth');
  };

  return (
    <div data-test-id='status-block'>
      <h3 className='block-form__title'>Регистрация успешна</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>
          Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
        </p>
        <button type='button' onClick={onClickNavigate} className='item-form__btn item-form__btn_link'>
          вход
        </button>
      </div>
    </div>
  );
}

export { RegistrationSuccessful };
