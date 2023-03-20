import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { resetError } from '../../store/features/post/post-slice';
import { ModalCalendar } from '../modal-calendar';
import { ModalCalendarChange } from '../modal-calendar-change';
import { Rating } from '../rating/rating';
import { SelectColor } from '../select-color';
import { ToastError } from '../toast-error';
import { ToastSuccessful } from '../toast-successful';

import './card.scss';

function Card(props) {
  const { id, image, title, authors, booking, issueYear, rating, filter, delivery } = props;
  const dispatch = useDispatch();
  const { error, success, errorChange, successChange, errorDelete, successDelete } = useSelector((state) => state.post);
  const [isActiveModalCalendar, setActiveModalCalendar] = useState(false);
  const [isActiveModalCalendarChange, setActiveModalCalendarChange] = useState(false);
  const [isActiveToastSuccessful, setActiveToastSuccessful] = useState(false);
  const [isActiveToast, setActiveToast] = useState(false);
  const { userIdAut } = useSelector((state) => state.authorization);
  let userId;

  if (userIdAut) {
    userId = userIdAut;
  } else {
    userId = +localStorage.getItem('userId');
  }

  let time = '';
  const { name } = useParams();

  if (delivery) {
    const dateHandedTo = new Date(delivery.dateHandedTo);
    const formatDate = dateHandedTo.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
    const month = formatDate.split('/')[0].padStart(2, '0');
    const day = dateHandedTo.getDate();

    time = `${day}.${month}`;
  }
  const nameCategory = name ? name : 'all';

  const d1 = id + new Date();
  const handlerToastCalendar = () => {
    if (success || successChange || successDelete) {
      setActiveToastSuccessful(true);
    }
    if (error || errorChange || errorDelete) {
      setActiveToast(true);
    }
    setTimeout(() => {
      dispatch(resetError());
      setActiveToast(false);
      setActiveToastSuccessful(false);
      clearTimeout();
    }, 4000);
  };
  const handlerToastClose = () => {
    dispatch(resetError());
    setActiveToastSuccessful(false);

    setActiveToast(false);
  };
  const light = (str) => <SelectColor key={d1} filter={filter} str={str} />;
  const openModelCalendar = (e) => {
    e.preventDefault();
    setActiveModalCalendar(true);
  };
  const closeModelCalendar = () => {
    setActiveModalCalendar(false);
    handlerToastCalendar();
  };
  const openModelCalendarChange = (e) => {
    e.preventDefault();
    setActiveModalCalendarChange(true);
  };
  const closeModelCalendarChange = () => {
    setActiveModalCalendarChange(false);
    handlerToastCalendar();
  };

  return (
    <div data-test-id='card' className='card__item ' id={id}>
      {isActiveToastSuccessful && <ToastSuccessful handlerToastClose={handlerToastClose} />}
      {isActiveToast && <ToastError handlerToastClose={handlerToastClose} />}
      <Link to={`/books/${nameCategory}/${id}`} className='btn'>
        <div className={`card__element  ${image ? '' : 'card__element_not-img'}`}>
          {image ? (
            <img className='card__img' src={`https://strapi.cleverland.by${image.url}`} alt='card-vertical-1' />
          ) : null}
        </div>

        {rating ? (
          <div className='card__star-wrap'>
            <Rating rating={rating} />
          </div>
        ) : (
          <p className='card__estimation'>ещё нет оценок</p>
        )}
        <div className='card__description'>
          <p className='card__text'>{light(title)}</p>
          <h4 className='card__title'>
            {authors[0]}, {issueYear}
          </h4>
        </div>
      </Link>
      <div className='card__btn btn'>
        {booking && booking?.customerId === userId ? (
          <button
            data-test-id='booking-button'
            type='button'
            onClick={openModelCalendarChange}
            className='btn__card btn__card_busy'
          >
            Забронирована
          </button>
        ) : booking && booking?.customerId !== userId ? (
          <button data-test-id='booking-button' type='button' className='btn__card btn__card_busy' disabled={true}>
            Забронирована
          </button>
        ) : delivery ? (
          <button data-test-id='booking-button' type='button' className='btn__card btn__card_busy' disabled={true}>
            занята до {time}
          </button>
        ) : (
          <button data-test-id='booking-button' type='button' onClick={openModelCalendar} className='btn__card'>
            Забронировать
          </button>
        )}
      </div>
      {isActiveModalCalendar && <ModalCalendar closeModelCalendar={closeModelCalendar} idBook={id} />}
      {isActiveModalCalendarChange && (
        <ModalCalendarChange
          closeModelCalendarChange={closeModelCalendarChange}
          idBook={id}
          bookingDate={booking?.dateOrder}
        />
      )}
    </div>
  );
}
export { Card };
