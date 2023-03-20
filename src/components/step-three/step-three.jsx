import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { InputMask } from 'primereact/inputmask';

import { RegExp } from '../../utils/reg-exp';

function StepThree(props) {
  const [phoneError, setPhoneError] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    props.setValue('phone', phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  return (
    <div className='step-one'>
      <div className='item-form__wrap form-item'>
        <InputMask
          mask='+375 (99) 999-99-99'
          slotChar='x'
          id='phone'
          type='tel'
          autoClear={false}
          required={true}
          placeholder=' '
          className={`form-input ${props.errors.phone ? 'form-input_errors' : ''}`}
          {...props.register('phone', {
            required: 'phone is required',
            onChange: (e) => {
              const valuePhone = e.target.value;
              const valuePhoneClean = valuePhone.replace(/\s/g, '').replace(/[-()]/g, '');

              if (valuePhoneClean.search(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/) === -1) {
                setPhoneError(true);
              } else {
                setPhoneError(false);
                setPhone(e.target.value);
              }
            },
          })}
        />
        <label className='form-label' htmlFor='phone'>
          Номер телефона
        </label>
        {props.errors.phone?.type === 'required' && (
          <p data-test-id='hint' className='small  small-errors'>
            Поле не может быть пустым
          </p>
        )}
        <p data-test-id='hint' className={`small ${phoneError ? 'small-errors' : ''}`}>
          В формате +375 (xx) xxx-xx-xx
        </p>
      </div>
      <div className='item-form__wrap form-item form-item_relative'>
        <input
          type='email'
          id='email'
          placeholder=' '
          className={`form-input ${props.errors.email ? 'form-input_errors' : ''}`}
          {...props.register('email', {
            required: true,
            minLength: 3,
            pattern: RegExp.email,
          })}
        />

        <label className='form-label' htmlFor='email'>
          E-mail
        </label>
        {props.errors.email?.type === 'required' && (
          <p data-test-id='hint' className='small  small-errors'>
            Поле не может быть пустым
          </p>
        )}
        {props.errors?.email && (
          <p data-test-id='hint' className='small  small-errors'>
            Введите корректный e-mail
          </p>
        )}
      </div>
    </div>
  );
}

export { StepThree };
