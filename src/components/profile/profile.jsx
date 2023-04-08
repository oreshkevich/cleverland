import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { InputMask } from 'primereact/inputmask';

import avatarCat from '../../assets/img/avatar_cat.png';
import eye from '../../assets/svg/eye.svg';
import eyeClose from '../../assets/svg/eye-close.svg';
import ok from '../../assets/svg/ok.svg';
import { ErrorPassword } from '../../function/error-password';
import { fetchUser, postImgAvatar, putUser } from '../../store/features/post/post-slice';
import { RegExp } from '../../utils/reg-exp';
import { Spinner } from '../spinner/spinner';
import { ToastError } from '../toast-error';
import { ToastSuccessful } from '../toast-successful';

import './profile.scss';

// eslint-disable-next-line complexity
function Profile() {
  const { user, loading, error, successPut, successImg, imgAvatarError, imgAvatar } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const changePhoto = async (image) => {
    dispatch(postImgAvatar(image));
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const watchPassword = watch('password');
  const choiceErrorPassword = useCallback(() => <ErrorPassword str={watchPassword} />, [watchPassword]);
  const [focusPassword, setFocusPassword] = useState(false);
  const [check, setCheck] = useState(false);
  const [isInputActive, setInputActive] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [isResponsiveImgError, setResponsiveImgError] = useState(false);
  const [isResponsive, setResponsive] = useState(false);
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const [isModalImg, setModalImg] = useState(false);
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');

      return;
    }
    setPasswordType('password');
  };

  const onSubmit = async (data) => {
    dispatch(putUser(data));
  };

  const handleRedact = () => {
    setInputActive(true);
  };

  useEffect(() => {
    if (error) {
      setModalErrorActive(true);
    } else {
      setModalErrorActive(false);
    }
    if (imgAvatarError) {
      setResponsiveImgError(true);
    } else {
      setResponsiveImgError(false);
    }
    if (successPut) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
    if (successImg) {
      setModalImg(true);
    } else {
      setModalImg(false);
    }
  }, [successPut, error, imgAvatarError, successImg]);
  useEffect(() => {
    setValue('password', user.password);
    setValue('phone', user.phone);
    setValue('email', user.email);
    setValue('lastName', user.lastName);
    setValue('firstName', user.firstName);
    setValue('username', user.username);
  }, [isInputActive, setValue, user.email, user.lastName, user.username, user.firstName, user.password, user.phone]);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch, imgAvatar]);

  return (
    <div className='container'>
      {isResponsive && <ToastSuccessful message='Изменения успешно сохранены!' close={() => setResponsive(false)} />}
      {isModalErrorActive && (
        <ToastError message='Изменения не были сохранены. Попробуйте позже!' close={() => setModalErrorActive(false)} />
      )}
      {isModalImg && <ToastSuccessful message='Фото успешно сохранено!' close={() => setModalImg(false)} />}
      {isResponsiveImgError && (
        <ToastError
          message='Что-то пошло не так, фото не сохранилось. Попробуйте позже!'
          close={() => setResponsiveImgError(false)}
        />
      )}
      <div className='profile-page'>
        <div className='profile-page__avatar'>
          <div className='profile-page-avatar'>
            <input
              type='file'
              onChange={(e) => {
                changePhoto(e.target.files[0]);
              }}
            />
            <img src={user.avatar ? `https://strapi.cleverland.by${user.avatar}` : avatarCat} alt='' />
            <button type='button'>
              <i className='icon' data-size='default'>
                <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M19 6H13.3284C12.798 6 12.2893 6.21071 11.9142 6.58579L10.5858 7.91421C10.2107 8.28929 9.70201 8.5 9.17157 8.5H6C4.89543 8.5 4 9.39543 4 10.5V25C4 26.1046 4.89543 27 6 27H25.5C26.6046 27 27.5 26.1046 27.5 25V14.5'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                  <path d='M26 4V10' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
                  <path d='M23 7H29' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
                  <circle cx='16' cy='17' r='6' stroke='white' strokeWidth='1.5' />
                </svg>
              </i>
            </button>
          </div>
          <h1>
            {user.lastName}
            <br />
            {user.firstName}
          </h1>
        </div>
        <div className='profile-page__profile-block'>
          <h4>Учётные данные</h4>
          <p className='profile-page__text'>Здесь вы можете отредактировать информацию о себе</p>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <div className='profile-page-input'>
              <input
                placeholder=' '
                id='username'
                disabled={!isInputActive}
                defaultValue={user.username}
                className={`form-input ${errors?.username ? 'form-input_errors' : ''}`}
                type='text'
                {...register('username', {
                  required: true,
                  minLength: 1,
                })}
              />

              <label className='form-label' htmlFor='username'>
                Логин
              </label>
              {errors?.username && (
                <p data-test-id='hint' className='small  small-errors'>
                  Поле не может быть пустым
                </p>
              )}
            </div>
            {/* <div className='profile-page-input'>
              <input
                placeholder=' '
                type={passwordType}
                disabled={!isInputActive}
                defaultValue={user.password}
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
            </div> */}
            <div className='profile-page-input'>
              <input
                type={passwordType}
                id='password'
                placeholder=' '
                className='form-input'
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
              {errors.password?.type === 'required' && (
                <p data-test-id='hint' className='small  small-errors'>
                  Поле не может быть пустым
                </p>
              )}
              <p data-test-id='hint' className={errors.password && focusPassword ? 'small small-errors' : 'small'}>
                {choiceErrorPassword()}
              </p>
            </div>
            <div className='profile-page-input'>
              <input
                id='firstName'
                disabled={!isInputActive}
                defaultValue={user.firstName}
                placeholder=' '
                className={`form-input ${errors.name ? 'form-input_errors' : ''}`}
                type='text'
                {...register('firstName', {
                  required: true,
                  minLength: 1,
                })}
              />
              <label className='form-label' htmlFor='firstName'>
                Имя
              </label>
              {errors?.firstName && (
                <p data-test-id='hint' className='small  small-errors'>
                  Поле не может быть пустым
                </p>
              )}
            </div>
            <div className='profile-page-input form-item_relative'>
              <input
                type='text'
                id='lastName'
                placeholder=' '
                disabled={!isInputActive}
                defaultValue={user.lastName}
                className='form-input'
                {...register('lastName', {
                  required: true,
                  minLength: 1,
                })}
              />

              <label className='form-label' htmlFor='lastName'>
                Фамилия
              </label>
              {errors?.lastName && (
                <p data-test-id='hint' className='small  small-errors'>
                  Поле не может быть пустым
                </p>
              )}
            </div>
            <div className='profile-page-input'>
              <InputMask
                mask='+375 (99) 999-99-99'
                slotChar='x'
                id='phone'
                type='tel'
                autoClear={false}
                required={true}
                placeholder=' '
                className={`form-input ${errors.phone ? 'form-input_errors' : ''}`}
                {...register('phone', {
                  required: 'phone is required',
                  onChange: (e) => {
                    const valuePhone = e.target.value;
                    const valuePhoneClean = valuePhone.replace(/\s/g, '').replace(/[-()]/g, '');

                    if (valuePhoneClean.search(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/) === -1) {
                      setPhoneError(true);
                    } else {
                      setPhoneError(false);
                    }
                  },
                })}
              />
              <label className='form-label' htmlFor='phone'>
                Номер телефона
              </label>
              {errors.phone?.type === 'required' && (
                <p data-test-id='hint' className='small  small-errors'>
                  Поле не может быть пустым
                </p>
              )}
              <p data-test-id='hint' className={`small ${phoneError ? 'small-errors' : ''}`}>
                В формате +375 (xx) xxx-xx-xx
              </p>
            </div>
            <div className='profile-page-input form-item_relative'>
              <input
                type='email'
                id='email'
                placeholder=' '
                className={`form-input ${errors.email ? 'form-input_errors' : ''}`}
                {...register('email', {
                  required: true,
                  minLength: 3,
                  pattern: RegExp.email,
                })}
              />

              <label className='form-label' htmlFor='email'>
                E-mail
              </label>
              {errors.email?.type === 'required' && (
                <p data-test-id='hint' className='small  small-errors'>
                  Поле не может быть пустым
                </p>
              )}
              {errors?.email && (
                <p data-test-id='hint' className='small  small-errors'>
                  Введите корректный e-mail
                </p>
              )}
            </div>
            <div className='profile-page-btn'>
              <button type='button' onClick={handleRedact} className='item-form__btn item-form__btn_width'>
                Редактировать
              </button>
              <button type='submit' disabled={!isInputActive} className='item-form__btn item-form__btn_width'>
                Сохранить изменения
              </button>
            </div>
          </form>
        </div>
        <div className='profile-page__profile-block'>
          <h4>Забронированная книга</h4>
          <p className='profile-page__text'>
            Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
          </p>
          <div data-test-id='empty-blue-card' className='profile-page__blue-card'>
            <h3>
              Забронируйте книгу <br /> и она отобразится
            </h3>
          </div>
        </div>
        <div className='profile-page__profile-block'>
          <h4>Книга которую взяли</h4>
          <p className='profile-page__text'>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>
          <div data-test-id='empty-blue-card' className='profile-page__blue-card'>
            <h3>
              Прочитав книгу, <br /> она отобразится в истории{' '}
            </h3>
          </div>
        </div>
        <div className='profile-page__profile-block'>
          <h4>История</h4>
          <p className='profile-page__text'>Список прочитанных книг</p>
          <div data-test-id='empty-blue-card' className='profile-page__blue-card'>
            <h3>
              Вы не читали книг <br /> из нашей библиотеки{' '}
            </h3>
          </div>
        </div>
      </div>
      {loading ? <Spinner /> : null}
    </div>
  );
}

export { Profile };
