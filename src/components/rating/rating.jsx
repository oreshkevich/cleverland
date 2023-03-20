import React from 'react';

import star from '../../assets/svg/star-1.svg';
import starNotPainted from '../../assets/svg/star-2.svg';

import './rating.scss';

function Rating({ rating }) {
  const ratingInteger = Math.round(rating);
  const objRating = [];

  if (ratingInteger > 0) {
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingInteger) {
        objRating.push({ id: i, painted: true });
      } else {
        objRating.push({ id: i, painted: false });
      }
    }
  }

  return (
    <React.Fragment>
      {objRating.map((value) =>
        value.painted ? (
          <div key={value.id} data-test-id='star'>
            <img className='book-list__star-wrap-img' data-test-id='star-active' src={star} alt='star-1' />
          </div>
        ) : (
          <div key={value.id} data-test-id='star'>
            <img className='book-list__star-wrap-img' src={starNotPainted} alt='star-1' />
          </div>
        )
      )}
    </React.Fragment>
  );
}

export { Rating };
