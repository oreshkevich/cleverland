import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { deleteBookings, putBookingsChange } from '../../store/features/post/post-slice';
import { Calendar } from '../calendar';
import { Spinner } from '../spinner';
import { ToastError } from '../toast-error';
import { ToastSuccessful } from '../toast-successful';

import './modal-calendar-change.scss';

function ModalCalendarChange({ idBook, bookingDate, closeModel }) {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDay] = useState(new Date(bookingDate));
  const [isResponsive, setResponsive] = useState(false);
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const [isResponsiveDel, setResponsiveDel] = useState(false);
  const [isModalErrorActiveDel, setModalErrorActiveDel] = useState(false);

  const [disabledButton, setDisabledButton] = useState(true);
  const { loading, errorChange, successChange, errorDelete, successDelete, successPost } = useSelector(
    (state) => state.post
  );
  const { id } = useParams();
  const bookingsId = localStorage.getItem('bookingsId');
  const { userIdAut } = useSelector((state) => state.authorization);
  let userId;

  if (userIdAut) {
    userId = userIdAut;
  } else {
    userId = localStorage.getItem('userId');
  }
  let bookId;

  if (idBook) {
    bookId = idBook;
  } else if (id) {
    bookId = id;
  }
  const onSubmitChange = async () => {
    const formatDateSelected = new Date(selectedDate);

    formatDateSelected.setHours(formatDateSelected.getHours() + 3);
    const orderDate = formatDateSelected.toISOString();

    const objData = {
      book: bookId?.toString(),
      order: true,
      dateOrder: orderDate,
      customer: userId,
    };

    dispatch(putBookingsChange(objData, bookingsId));
  };
  const onClickDelete = async () => {
    dispatch(deleteBookings(bookingsId));
  };
  const handleCloseModelOverly = (event) => {
    if (event.currentTarget === event.target) {
      closeModel();
    }
  };

  useEffect(() => {
    if (errorChange) {
      setModalErrorActive(true);
    } else {
      setModalErrorActive(false);
    }
    if (errorDelete) {
      setModalErrorActiveDel(true);
    } else {
      setModalErrorActiveDel(false);
    }
    if (successChange) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
    if (successDelete) {
      setResponsiveDel(true);
    } else {
      setResponsiveDel(false);
    }
  }, [errorChange, errorDelete, successChange, successDelete]);

  if (isResponsiveDel) {
    return (
      <ToastSuccessful
        message='Бронирование книги успешно отменено!'
        close={() => setResponsiveDel(false)}
        closeParent={() => closeModel()}
      />
    );
  }

  if (isModalErrorActiveDel) {
    return (
      <ToastError
        message='Не удалось снять бронирование книги. Попробуйте позже!'
        close={() => setModalErrorActiveDel(false)}
        closeParent={() => closeModel()}
      />
    );
  }

  if (isResponsive) {
    return (
      <ToastSuccessful
        message='Изменения успешно сохранены!'
        close={() => setResponsive(false)}
        closeParent={() => closeModel()}
      />
    );
  }

  if (isModalErrorActive) {
    return (
      <ToastError
        message='Изменения не были сохранены. Попробуйте позже!'
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
        <div data-test-id='booking-modal' className='calendar-modal-wrapper'>
          <h2 data-test-id='modal-title' className='calendar-modal__title calendar-modal__title_change'>
            Изменение даты бронирования
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
                selectedDate={selectedDate}
                selectDate={(date) => setSelectedDay(date)}
                setDisabledButton={(d) => setDisabledButton(d)}
              />
            </div>
          </div>
          <div className='calendar-modal-buttons'>
            <button
              data-test-id='booking-button'
              type='submit'
              onClick={onSubmitChange}
              disabled={disabledButton}
              className='book-list__btn-modal book-list__btn-modal_ch'
            >
              забронировать
            </button>
            <button
              data-test-id='booking-cancel-button'
              type='submit'
              onClick={onClickDelete}
              className='book-list__btn-modal book-list__btn-modal_change'
            >
              отменить бронь
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export { ModalCalendarChange };
