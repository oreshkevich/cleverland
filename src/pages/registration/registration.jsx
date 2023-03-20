import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RegistrationSuccessful } from '../../components/registration-successful';
import { RequestErrors } from '../../components/request-errors';
import { RequestPost } from '../../components/request-post/request-post';
import { Spinner } from '../../components/spinner/spinner';
import { StepOne } from '../../components/step-one';
import { StepThree } from '../../components/step-three';
import { StepTwo } from '../../components/step-two';
import { addNewRegistration, resetError } from '../../store/features/registration/registration-slice';

import './registration.scss';

function Registration() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ mode: 'all' });

  const { loading, error, success } = useSelector((state) => state.registration);
  const [locationError, setLocationError] = useState(false);
  const [locationData, setLocationData] = useState();
  const watchUserName = watch('username');
  const watchPassword = watch('password');
  const [textError, setTextError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = (data) => {
    setCurrentStep((prev) => prev + 1);
    if (currentStep === 3) {
      setLocationData(data);
      dispatch(addNewRegistration(data));
      reset();
    }
  };

  const handleClickError = () => {
    dispatch(resetError());
    setTextError(false);
  };

  const handleResendingData = () => {
    onSubmit(locationData);
  };

  useEffect(() => {
    if (error) {
      setCurrentStep(1);
    }
  }, [error]);

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

  return (
    <div className='wrapper'>
      <div className='auth'>
        <main className='content-auth' data-test-id='auth'>
          <div className='container '>
            <div className='auth__item'>
              <h2 className='auth__title'>Cleverland</h2>

              <div className='block-form'>
                {textError ? (
                  <RequestErrors handleClickError={handleClickError} />
                ) : locationError ? (
                  <RequestPost handleResendingData={handleResendingData} />
                ) : success ? (
                  <RegistrationSuccessful />
                ) : (
                  <div>
                    <h3 className='block-form__title'>Регистрация</h3>
                    <div className='block-form__item'>
                      <div className='block-form__text'>{currentStep} шаг из 3</div>
                    </div>
                    <div className='block-form__item item-form'>
                      <form
                        data-test-id='register-form'
                        className='item-form__form'
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete='off'
                      >
                        {currentStep === 1 ? (
                          <StepOne
                            errors={errors}
                            register={register}
                            watchPassword={watchPassword}
                            watchUserName={watchUserName}
                          />
                        ) : null}
                        {currentStep === 2 ? <StepTwo errors={errors} register={register} /> : null}
                        {currentStep === 3 ? (
                          <StepThree errors={errors} register={register} setValue={setValue} />
                        ) : null}

                        <button
                          className='item-form__btn'
                          name='disable_button'
                          type='submit'
                          disabled={Object.keys(errors).length === 0 ? false : true}
                        >
                          {currentStep === 1 && 'следующий шаг'}
                          {currentStep === 2 && 'последний шаг'}
                          {currentStep === 3 && 'зарегистрироваться'}
                        </button>
                      </form>

                      <div className='block-form__elem'>
                        <span className='block-form__span'> Есть учётная запись?</span>
                        <Link className='block-form__link block-form__link_arrow' to='/auth'>
                          войти
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

export { Registration };
