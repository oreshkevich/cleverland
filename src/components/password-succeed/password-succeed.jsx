import { useNavigate } from 'react-router-dom';

function PasswordSucceed() {
  const navigate = useNavigate();
  const onClickNavigate = () => {
    navigate('/auth');
  };

  return (
    <div data-test-id='status-block'>
      <h3 className='block-form__title'>Новые данные сохранены</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>Зайдите в личный кабинет, используя свои логин и новый пароль</p>
        <button type='button' onClick={onClickNavigate} className='item-form__btn item-form__btn_link'>
          вход
        </button>
      </div>
    </div>
  );
}

export { PasswordSucceed };
