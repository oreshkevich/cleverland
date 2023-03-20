import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import eye from '../../assets/svg/eye.svg';
import eyeClose from '../../assets/svg/eye-close.svg';
import ok from '../../assets/svg/ok.svg';
import { PasswordError } from '../../components/password-error';
import { PasswordSucceed } from '../../components/password-succeed';
import { Spinner } from '../../components/spinner';
import { ErrorPassword } from '../../function/error-password';
import { postRecoveryPassword } from '../../store/features/recovery-password/recovery-password-slice';

import './password-recovery.scss';

function PasswordRecovery() {
  const location = useLocation();
  const codeLocation = location?.search.split('=')[1].split('.')[0];

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: 'all' });
  const [locationError, setLocationError] = useState(false);
  const [passwordTypeConfirmation, setPasswordTypeConfirmation] = useState('password');

  const watchPassword = watch('password');

  const [focusPassword, setFocusPassword] = useState(false);

  const [check, setCheck] = useState(false);
  const choiceErrorPassword = useCallback(() => <ErrorPassword str={watchPassword} />, [watchPassword]);
  const [passwordType, setPasswordType] = useState('password');
  const [equal, setEqual] = useState(true);
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');

      return;
    }
    setPasswordType('password');
  };

  const togglePasswordConfirmation = () => {
    if (passwordTypeConfirmation === 'password') {
      setPasswordTypeConfirmation('text');

      return;
    }
    setPasswordTypeConfirmation('password');
  };

  const { loading, error, success } = useSelector((state) => state.recovery);

  const onSubmit = async (data) => {
    dispatch(postRecoveryPassword(data, codeLocation));
    reset();
  };
  const handleClickError = () => {
    setLocationError((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (error) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
  }, [error]);

  const handleInput = () => {
    setEqual(true);
  };

  return (
    <div className='wrapper'>
      <div className='auth'>
        <main className='content-auth'>
          <div className='container '>
            <div className='auth__item'>
              <h2 className='auth__title'>Cleverland</h2>
              <div className='block-form' data-test-id='auth'>
                {locationError ? (
                  <PasswordError handleClickError={handleClickError} />
                ) : success ? (
                  <PasswordSucceed />
                ) : (
                  <div>
                    <h3 className='block-form__title'>Восстановление пароля</h3>

                    <div className='block-form__item item-form'>
                      <form
                        data-test-id='reset-password-form'
                        className='item-form__form'
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete='off'
                      >
                        <div className='item-form__wrap form-item form-item_relative'>
                          <input
                            type={passwordType}
                            id='password'
                            placeholder=' '
                            className={`form-input ${errors.password ? 'form-input_errors' : ''}`}
                            {...register('password', {
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
                          {check && (
                            <img data-test-id='checkmark' className='item-form__img' src={ok} alt='icon_action' />
                          )}
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
                          {errors.password?.type === 'required' && (
                            <p className='small  small-errors' data-test-id='hint'>
                              Поле не может быть пустым
                            </p>
                          )}
                          <p
                            data-test-id='hint'
                            className={errors.password && focusPassword ? 'small small-errors' : 'small'}
                          >
                            {choiceErrorPassword()}
                          </p>
                        </div>
                        <div className='item-form__wrap form-item form-item_relative'>
                          <input
                            type={passwordTypeConfirmation}
                            id='passwordConfirmation'
                            placeholder=' '
                            onFocus={handleInput}
                            className={`form-input ${equal ? '' : 'form-input_errors'}`}
                            {...register('passwordConfirmation', {
                              required: true,

                              onBlur: (e) => {
                                if (e.target.value === watchPassword) {
                                  setEqual(true);
                                } else {
                                  setEqual(false);
                                }
                              },
                            })}
                          />
                          <button
                            type='button'
                            className='btn btn-outline-primary'
                            onClick={togglePasswordConfirmation}
                          >
                            <img
                              data-test-id={passwordTypeConfirmation === 'password' ? 'eye-closed' : 'eye-opened'}
                              src={passwordTypeConfirmation === 'password' ? eyeClose : eye}
                              alt='icon_action'
                            />
                          </button>
                          <label className='form-label' htmlFor='password'>
                            Пароль
                          </label>
                          {errors.passwordConfirmation ? (
                            <p className='small  small-errors' data-test-id='hint'>
                              Поле не может быть пустым
                            </p>
                          ) : null}
                          {equal ? null : (
                            <p data-test-id='hint' className='small  small-errors'>
                              Пароли не совпадают
                            </p>
                          )}
                        </div>

                        <button
                          type='submit'
                          className='item-form__btn '
                          disabled={Object.keys(errors).length === 0 && equal ? false : true}
                        >
                          сохранить изменения
                        </button>
                      </form>
                      <div>
                        <span className='block-form__span'>
                          {' '}
                          После сохранения войдите в библиотеку, используя новый пароль
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        {loading ? <Spinner /> : null}
      </div>
    </div>
  );
}

export { PasswordRecovery };
