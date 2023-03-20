import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSearchId } from '../../store/features/book/book-slice';
import { postBookings } from '../../store/features/post/post-slice';
import { Calendar } from '../calendar';
import { Spinner } from '../spinner';

import './modal-calendar.scss';

function ModalCalendar({ closeModelCalendar, idBook }) {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDay] = useState(new Date());
  const [disabledButton, setDisabledButton] = useState(true);
  const { loading, error, success, successPost } = useSelector((state) => state.post);
  const { id } = useParams();
  const { userIdAut } = useSelector((state) => state.authorization);
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
      closeModelCalendar();
    }
  };

  if (success) {
    if (id) {
      dispatch(getSearchId(id));
    }
  }
  useEffect(() => {
    if ((success && successPost) || error) closeModelCalendar();
  }, [success, error, closeModelCalendar, successPost]);

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
            onClick={closeModelCalendar}
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
