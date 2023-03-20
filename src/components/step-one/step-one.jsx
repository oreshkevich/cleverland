import { useCallback, useState } from 'react';

import eye from '../../assets/svg/eye.svg';
import eyeClose from '../../assets/svg/eye-close.svg';
import ok from '../../assets/svg/ok.svg';
import { ErrorLogin } from '../../function/error-login';
import { ErrorPassword } from '../../function/error-password';
import { RegExp } from '../../utils/reg-exp';

function StepOne(props) {
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusLogin, setFocusLogin] = useState(false);
  const [check, setCheck] = useState(false);
  const choiceErrorPassword = useCallback(() => <ErrorPassword str={props.watchPassword} />, [props.watchPassword]);
  const choiceErrorUserName = useCallback(() => <ErrorLogin str={props.watchUserName} />, [props.watchUserName]);
  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');

      return;
    }
    setPasswordType('password');
  };

  return (
    <div className='step-one'>
      <div className='item-form__wrap form-item'>
        <input
          id='username'
          placeholder=' '
          className={`form-input ${props.errors.username ? 'form-input_errors' : ''}`}
          type='text'
          {...props.register('username', {
            required: true,
            validate: {
              latinLetters: (value) => [RegExp.allLatinAndNumerals].every((pattern) => pattern.test(value)),
            },

            onBlur: () => {
              setFocusLogin(true);
            },
            onChange: () => {
              setFocusLogin(false);
            },
          })}
        />
        <label className='form-label ' htmlFor='username'>
          Придумайте логин для входа
        </label>
        {props.errors.username?.type === 'required' && (
          <p data-test-id='hint' className='small  small-errors'>
            Поле не может быть пустым
          </p>
        )}

        <p data-test-id='hint' className={props.errors.username && focusLogin ? 'small small-errors' : 'small'}>
          {choiceErrorUserName()}
        </p>
      </div>
      <div className='item-form__wrap form-item form-item_relative'>
        <input
          type={passwordType}
          id='password'
          placeholder=' '
          className='form-input'
          {...props.register('password', {
            required: 'password is required',
            pattern: {
              value: RegExp.latinAndNumerals,
              message: 'enter valid password',
            },
            onBlur: () => {
              setFocusPassword(true);
            },
            onChange: (e) => {
              setFocusPassword(false);
              if (e.target.value.search(RegExp.latinAndNumerals) !== -1) setCheck(true);
            },
          })}
        />
        {check && <img data-test-id='checkmark' className='item-form__img' src={ok} alt='icon_action' />}
        <button type='button' className='btn btn-outline-primary' onClick={togglePassword}>
          <img
            data-test-id={passwordType === 'password' ? 'eye-closed' : 'eye-opened'}
            src={passwordType === 'password' ? eyeClose : eye}
            alt='icon_action'
          />
        </button>
        <label className='form-label' htmlFor='password'>
          Пароль
        </label>
        {props.errors.password?.type === 'required' && (
          <p data-test-id='hint' className='small  small-errors'>
            Поле не может быть пустым
          </p>
        )}
        <p data-test-id='hint' className={props.errors.password && focusPassword ? 'small small-errors' : 'small'}>
          {choiceErrorPassword()}
        </p>
      </div>
    </div>
  );
}

export { StepOne };
