import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Spinner } from '../../components/spinner/spinner';
import { SuccessfulResponse } from '../../components/successful-response/successful-response';
import { postPassword } from '../../store/features/password/password-slice';
import { RegExp } from '../../utils/reg-exp';

import './forgot-pass.scss';

function ForgotPass() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm({ mode: 'all' });

  const { loading, error, success } = useSelector((state) => state.password);

  const onSubmit = async (data) => {
    dispatch(postPassword(data));
    reset();
  };

  return (
    <div className='wrapper'>
      <div className='auth'>
        <main className='content-auth' data-test-id='auth'>
          <div className='container '>
            <div className='auth__item'>
              <h2 className='auth__title'>Cleverland</h2>

              <div className='block-form block-form_email'>
                {success ? (
                  <SuccessfulResponse />
                ) : (
                  <div>
                    <div className='block-form__auth'>
                      <Link className='block-form__auth-link' to='/auth'>
                        вход в личный кабинет
                      </Link>
                    </div>

                    <h3 className='block-form__title'>Восстановление пароля</h3>

                    <div className='block-form__item item-form'>
                      <form
                        data-test-id='send-email-form'
                        className='item-form__form'
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete='off'
                      >
                        <div className='item-form__wrap form-item form-item_relative'>
                          <input
                            type='email'
                            id='email'
                            placeholder=' '
                            className='form-input'
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
                            <p className='small  small-errors' data-test-id='hint'>
                              Поле не может быть пустым
                            </p>
                          )}
                          <p data-test-id='hint' className='small  small-errors'>
                            {' '}
                            {errors?.email && errors.email?.type !== 'required'
                              ? 'Введите корректный e-mail'
                              : error
                              ? error
                              : ' '}{' '}
                          </p>
                          <p className='small  '>
                            На это email будет отправлено письмо с инструкциями по восстановлению пароля
                          </p>
                        </div>

                        <button type='submit' className='item-form__btn '>
                          восстановить
                        </button>
                      </form>
                      <div>
                        <span className='block-form__span'> Нет учётной записи?</span>
                        <Link className='block-form__link block-form__link_arrow' to='/registration'>
                          Регистрация
                        </Link>
                      </div>
                    </div>
                    {loading ? <Spinner /> : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export { ForgotPass };
