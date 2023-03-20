import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { LoginErrors } from '../../components/login-errors';
import { Spinner } from '../../components/spinner/spinner';
import { postAuthorization } from '../../store/features/authorization/authorization-slice';

import './auth.scss';

function Auth() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const [locationError, setLocationError] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const handleClickError = () => {
    setLocationError((prevValue) => !prevValue);
  };

  const [textError, setTextError] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const { loading, error } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');

      return;
    }
    setPasswordType('password');
  };

  const onSubmit = async (data) => {
    dispatch(postAuthorization(data));
  };

  useEffect(() => {
    if (error === 'Bad Request') {
      setTextError(true);
    } else if (error !== 'Bad Request' && error) {
      setLocationError(true);
      setTextError(false);
    } else {
      setLocationError(false);
    }
  }, [error]);
  const tokenLocalStorage = localStorage.getItem('token');
  let token;

  if (tokenLocalStorage === 'false') {
    token = false;
  } else {
    token = tokenLocalStorage;
  }
  const onClickTransition = () => {
    if (token) {
      navigate('./books/all');
    }
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
                  <LoginErrors handleClickError={handleClickError} />
                ) : (
                  <div>
                    <h3 className='block-form__title'>Вход в личный кабинет</h3>

                    <div className='block-form__item item-form'>
                      <form
                        data-test-id='auth-form'
                        className='item-form__form'
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete='off'
                      >
                        <div className='item-form__wrap form-item'>
                          <input
                            placeholder=' '
                            id='identifier'
                            className={`form-input ${errors?.identifier ? 'form-input_errors' : ''}`}
                            type='text'
                            {...register('identifier', {
                              required: true,
                              minLength: 1,
                            })}
                          />

                          <label className='form-label' htmlFor='identifier'>
                            Логин
                          </label>
                          {errors?.identifier && (
                            <p data-test-id='hint' className='small  small-errors'>
                              Поле не может быть пустым
                            </p>
                          )}
                        </div>
                        <div className='item-form__wrap form-item'>
                          <input
                            placeholder=' '
                            type={passwordType}
                            id='password'
                            className={`form-input ${errors?.password ? 'form-input_errors' : ''}`}
                            {...register('password', {
                              required: true,
                              minLength: 1,
                              onChange: () => {
                                setShowEye(true);
                              },
                            })}
                          />
                          {showEye && (
                            <button
                              data-test-id={passwordType === 'password' ? 'eye-closed' : 'eye-opened'}
                              type='button'
                              className={`btn btn-outline-primary ${
                                passwordType === 'password' ? 'input__eye' : ' input__eye_open'
                              } `}
                              onClick={togglePassword}
                            >
                              {' '}
                            </button>
                          )}
                          <label className='form-label' htmlFor='password'>
                            Пароль
                          </label>
                          {errors?.password && (
                            <p data-test-id='hint' className='small  small-errors'>
                              Поле не может быть пустым
                            </p>
                          )}
                          {textError && (
                            <p data-test-id='hint' className='form-error small-errors'>
                              Неверный логин или пароль!
                            </p>
                          )}
                        </div>
                        <Link to='/forgot-pass'>{textError ? 'Восстановить?' : 'Забыли логин или пароль?'}</Link>
                        <button type='submit' onClick={onClickTransition} className='item-form__btn '>
                          вход
                        </button>
                      </form>
                      <div>
                        <span className='block-form__span'> Нет учётной записи?</span>
                        <Link className='block-form__link block-form__link_arrow' to='/registration'>
                          Регистрация
                        </Link>
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

export { Auth };
