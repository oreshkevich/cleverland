import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { httpService } from '../../api/api';
import { getSearchId, postReviews } from '../../store/features/book/book-slice';
// import { postReviews } from '../../store/features/reviews/reviews-slice';
import { Spinner } from '../spinner';

import './modal-reviews.scss';

function ModalReviews({ closeModel }) {
  const dispatch = useDispatch();

  const [valueRate, setValueRate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  // const { loadingReviews, errorReviews, successReviews } = useSelector((state) => state.reviews);
  const { books, loadingBook, loading, errorReviews, successReviews, reviews } = useSelector((state) => state.book);
  const { userIdAut } = useSelector((state) => state.authorization);
  const ArrStarQuantity = [1, 2, 3, 4, 5];

  const handlerClick = (quantity) => {
    setValueRate(quantity);
  };
  const {
    register,
    handleSubmit,

    reset,
  } = useForm({ mode: 'all' });
  const { id } = useParams();
  let userId;

  if (userIdAut) {
    userId = userIdAut;
  } else {
    userId = localStorage.getItem('userId');
  }

  const onSubmit = async (data) => {
    const objData = { ...data, rating: valueRate, book: id?.toString(), user: userId?.toString() };

    dispatch(postReviews(objData));
    //   setSuccess(true);
    // dispatch(getSearchId(id));
    reset();
  };
  const handleCloseModelOverly = (event) => {
    if (event.currentTarget === event.target) {
      closeModel();
    }
  };

  //   if (successReviews) {
  //     dispatch(getSearchId(id));
  //   }

  useEffect(() => {
    if (successReviews || errorReviews) closeModel();
  }, [successReviews, errorReviews, closeModel]);

  return (
    <React.Fragment>
      {loading && <Spinner />}
      <div
        data-test-id='modal-outer'
        role='button'
        tabIndex={0}
        onKeyDown={handleCloseModelOverly}
        onClick={handleCloseModelOverly}
        className='reviews-overlay'
        aria-label='закрыть модальное окно'
      >
        <div className='reviews-modal-wrapper' data-test-id='modal-rate-book'>
          <h2 className='reviews-modal__title' data-test-id='modal-title'>
            Оцените книгу
          </h2>
          <button
            data-test-id='modal-close-button'
            type='button'
            onClick={closeModel}
            className='reviews-modal__close'
            aria-label='закрыть модальное окно'
          />
          <h4 className='reviews-modal__text'>Ваша оценка</h4>

          <div className='reviews-modal__img' data-test-id='rating'>
            {ArrStarQuantity.map((quantity) => (
              <div data-test-id='star' key={quantity}>
                <div
                  className={quantity <= valueRate ? 'modal-img__star' : 'modal-img__star-not'}
                  onKeyDown={() => handlerClick(quantity)}
                  role='button'
                  tabIndex={0}
                  onClick={() => handlerClick(quantity)}
                  data-test-id={quantity <= valueRate ? 'star-active' : ''}
                >
                  {' '}
                </div>
              </div>
            ))}
          </div>
          <form className='reviews-modal__form' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <textarea
              data-test-id='comment'
              className='reviews-modal__text-area'
              placeholder='Оставить отзыв'
              name='textarea'
              {...register('text', {
                required: false,
              })}
            />

            <div className='reviews-modal-buttons'>
              <button type='submit' data-test-id='button-comment' className='book-list__btn-modal'>
                оценить
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export { ModalReviews };
