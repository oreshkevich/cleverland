import ivanImg from '../../assets/img/ivan.png';
import { Rating } from '../rating/rating';

import './comments.scss';

function Comments(props) {
  const { createdAt, rating, text, user } = props;

  const serverDate = new Date(createdAt);
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const dataMonth = serverDate.toLocaleDateString('ru-RU', options);

  return (
    <div data-test-id='comment-wrapper'>
      <div
        className='book-list__wrap-feedback book-list__wrap-feedback_padding
            '
      >
        <div className='book-list__feedback-item book-list__feedback-item_padding'>
          {user.avatarUrl ? <img src={`${user.avatarUrl}`} alt='Ivan' /> : <img src={ivanImg} alt='Ivan' />}
          <div className='book-list__feedback-elem'>
            <span className='book-list__feedback-text' data-test-id='comment-author'>
              {user.firstName} {user.lastName}
            </span>
            <span className='book-list__feedback-text' data-test-id='comment-date'>
              {dataMonth}
            </span>
          </div>
        </div>
        <div className='book-list__star-wrap book-list__star-wrap_padding' data-test-id='rating'>
          <Rating rating={rating} />
        </div>
      </div>
      <p className='book-list__text' data-test-id='comment-text'>
        {text}
      </p>
    </div>
  );
}

export { Comments };
