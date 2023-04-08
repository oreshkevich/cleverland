import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { postBookings } from '../../store/features/post/post-slice';
import { Calendar } from '../calendar';
import { Spinner } from '../spinner';
import { ToastError } from '../toast-error';
import { ToastSuccessful } from '../toast-successful';

import './modal-calendar.scss';

function ModalCalendar({ closeModel, idBook }) {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDay] = useState(new Date());
  const [disabledButton, setDisabledButton] = useState(true);
  const { loading, error, success } = useSelector((state) => state.post);
  const { id } = useParams();
  const { userIdAut } = useSelector((state) => state.authorization);
  const [isResponsive, setResponsive] = useState(false);
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  let userId;

  if (userIdAut) {
    userId = userIdAut;
  } else {
    userId = localStorage.getItem('userId');
  }
  const onSubmit = async () => {
    const formatDateSelected = new Date(selectedDate);

    formatDateSelected.setHours(formatDateSelected.getHours() + 3);
    const orderDate = formatDateSelected.toISOString();
    let bookId;

    if (idBook) {
      bookId = idBook;
    } else if (id) {
      bookId = id;
    }
    const objData = {
      book: bookId?.toString(),
      order: true,
      dateOrder: orderDate,
      customer: userId,
    };

    dispatch(postBookings(objData));
  };
  const handleCloseModelOverly = (event) => {
    if (event.currentTarget === event.target) {
      closeModel();
    }
  };

  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => {
      document.body.classList.remove('no__scroll');
    };
  }, []);
  useEffect(() => {
    if (error) {
      setModalErrorActive(true);
    } else {
      setModalErrorActive(false);
    }
    if (success) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
  }, [error, success]);

  if (isResponsive) {
    return (
      <ToastSuccessful
        message='Книга забронирована. Подробности можно посмотреть на странице Профиль'
        close={() => setResponsive(false)}
        closeParent={() => closeModel()}
      />
    );
  }

  if (isModalErrorActive) {
    return (
      <ToastError
        message='Что-то пошло не так, книга не забронирована. Попробуйте позже!'
        close={() => setModalErrorActive(false)}
        closeParent={() => closeModel()}
      />
    );
  }

  return (
    <React.Fragment>
      {loading && <Spinner />}
      <div
        data-test-id='modal-outer'
        role='button'
        tabIndex={0}
        onKeyDown={handleCloseModelOverly}
        onClick={handleCloseModelOverly}
        className='calendar-modal__overlay'
        aria-label='закрыть модальное окно'
      >
        <div className='calendar-modal-wrapper' data-test-id='booking-modal'>
          <h2 className='calendar-modal__title' data-test-id='modal-title'>
            Выбор даты бронирования
          </h2>
          <button
            data-test-id='modal-close-button'
            type='button'
            onClick={closeModel}
            className='calendar-modal__close'
            aria-label='закрыть модальное окно'
          />
          <div className='calendar-wrap'>
            <div className='app__container'>
              <Calendar
                locale='ru-Ru'
                selectDate={(date) => setSelectedDay(date)}
                setDisabledButton={(d) => setDisabledButton(d)}
              />
            </div>
          </div>
          <div className='calendar-modal-buttons'>
            <button
              data-test-id='booking-button'
              type='submit'
              onClick={onSubmit}
              disabled={disabledButton}
              className='book-list__btn-modal'
            >
              забронировать
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export { ModalCalendar };
