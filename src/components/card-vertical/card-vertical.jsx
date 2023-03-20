import { Link, useParams } from 'react-router-dom';

import { Rating } from '../rating/rating';
import { SelectColor } from '../select-color';

import './card-vertical.scss';

function CardVertical(props) {
  const { id, image, title, authors, booking, issueYear, rating, filter, delivery } = props;
  const userId = +localStorage.getItem('userId');
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

  const light = (str) => <SelectColor key={d1} filter={filter} str={str} />;

  return (
    <Link to={`/books/${nameCategory}/${id}`} data-test-id='card' className='btn'>
      <div className='card-vertical__item ' id={id}>
        <div className={`card-vertical__element  ${image ? '' : 'card-vertical__element_not-img'}`}>
          {image ? (
            <img
              className='card-vertical__img'
              src={`https://strapi.cleverland.by${image.url}`}
              alt='card-vertical-1'
            />
          ) : null}
        </div>

        <div className='card-vertical__item-wrap '>
          <div className='card-vertical__description'>
            <p className='card-vertical__text'>{light(title)}</p>
            <h4 className='card-vertical__title'>
              {authors[0]}, {issueYear}
            </h4>
          </div>
          <div className='card-vertical__wrap-flex'>
            {rating ? (
              <div className='card-vertical__star-wrap'>
                <Rating rating={rating} />
              </div>
            ) : (
              <p className='card-vertical__estimation'>ещё нет оценок</p>
            )}

            <div className='card-vertical__btn btn'>
              {booking && booking?.customerId === userId ? (
                <button
                  data-test-id='booking-button'
                  type='button'
                  className='btn__card-vertical btn__card-vertical_busy'
                >
                  Забронирована
                </button>
              ) : booking && booking?.customerId !== userId ? (
                <button
                  data-test-id='booking-button'
                  type='button'
                  className='btn__card-vertical btn__card-vertical_busy'
                  disabled={true}
                >
                  Забронирована
                </button>
              ) : delivery ? (
                <button
                  data-test-id='booking-button'
                  type='button'
                  className='btn__card-vertical btn__card-vertical_busy'
                  disabled={true}
                >
                  занята до {time}
                </button>
              ) : (
                <button data-test-id='booking-button' type='button' className='btn__card-vertical'>
                  Забронировать
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export { CardVertical };
