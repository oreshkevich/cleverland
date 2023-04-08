import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import iconOther from '../../assets/img/icon_Other.png';
import strokeArrow from '../../assets/svg/icon-more.svg';
import strokeBtn from '../../assets/svg/icon-response.svg';
import starNotPainted from '../../assets/svg/star-2.svg';
import { getSearchId, resetReviewsError } from '../../store/features/book/book-slice';
import { resetError } from '../../store/features/post/post-slice';
import { Comments } from '../comments';
import { ModalCalendar } from '../modal-calendar';
import { ModalCalendarChange } from '../modal-calendar-change';
import { ModalReviews } from '../modal-reviews';
import { Rating } from '../rating/rating';
import { Spinner } from '../spinner';
import { SwiperNew } from '../swiper';

import './book-item.scss';

// eslint-disable-next-line complexity
function BookItem() {
  const { books, loadingBook, reviews } = useSelector((state) => state.book);
  const { name, id } = useParams();
  const { bookings, bookingsChange, bookingsDelete } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [onShow, setOnShow] = useState(true);
  const [isActiveModal, setActiveModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const userId = +localStorage.getItem('userId');
  const bookItem = true;
  const [isCalendar, setCalendar] = useState(false);
  const [isCalendarChange, setCalendarChange] = useState(false);

  useEffect(() => {
    if (books?.comments && books?.comments.some((comment) => comment.user.commentUserId === userId)) {
      setIsDisabled(true);
    } else setIsDisabled(false);
  }, [books?.comments, userId]);

  const clickHide = () => {
    setOnShow(!onShow);
  };

  let time = '';

  if (books.delivery) {
    const dateHandedTo = new Date(books.delivery.dateHandedTo);
    const formatDate = dateHandedTo.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
    const month = formatDate.split('/')[0].padStart(2, '0');
    const day = dateHandedTo.getDate();

    time = `${day}.${month}`;
  }
  const openModel = () => {
    setActiveModal(true);
  };
  const closeModel = () => {
    setCalendar(false);
    setActiveModal(false);
    setCalendarChange(false);
    dispatch(resetError());
    dispatch(resetReviewsError());
  };
  const openModelCalendar = () => {
    setCalendar(true);
  };

  const openModelCalendarChange = (e) => {
    e.preventDefault();
    setCalendarChange(true);
  };

  let sortComments;

  if (books.comments) {
    sortComments = [...books.comments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  useEffect(() => {
    dispatch(getSearchId(id));
  }, [dispatch, id, reviews, bookings, bookingsChange, bookingsDelete]);

  return (
    <div>
      {loadingBook ? (
        <Spinner />
      ) : (
        <div>
          <div className='book-list__nav '>
            <div className='container'>
              <Link data-test-id='breadcrumbs-link' to={`/books/${name}`} className='btn'>
                <span className='book-list__page'>{name === 'all' ? 'Все книги' : books.categories[0]}</span>
              </Link>

              <span className='book-list__span'> / </span>
              <span data-test-id='book-name' className='book-list__page '>
                {books.title}
              </span>
            </div>
          </div>
          <div className='container'>
            <div className='book-list__wrap'>
              <div className='one-book'>
                {books.images?.length === 1 ? (
                  <div className='book-list__item'>
                    <img
                      className='book-list__img'
                      src={`https://strapi.cleverland.by${books.images[0].url}`}
                      alt='card'
                    />
                  </div>
                ) : books.images?.length > 1 ? (
                  <div className='book-list__item-swiper'>
                    <SwiperNew books={books.images} />
                  </div>
                ) : (
                  <div className='book-list__item book-list__item_not-img'>
                    <img className='book-list__img-not' src={iconOther} alt='card-vertical-1' />
                  </div>
                )}
              </div>
              <div className='book__about' data-test-id='card'>
                <h2 data-test-id='book-title' className='book-list__title'>
                  {books.title}
                </h2>
                <p className='book-list__author'>
                  {books?.authors[0]}, {books.issueYear}
                </p>

                {books.booking && books.booking?.customerId === userId ? (
                  <button
                    data-test-id='booking-button'
                    type='button'
                    onClick={openModelCalendarChange}
                    className='book-list__btn book-list__btn_busy'
                  >
                    Забронирована
                  </button>
                ) : books.booking && books.booking?.customerId !== userId ? (
                  <button
                    data-test-id='booking-button'
                    type='button'
                    className='book-list__btn book-list__btn_busy'
                    disabled={true}
                  >
                    Забронирована
                  </button>
                ) : books.delivery ? (
                  <button
                    data-test-id='booking-button'
                    type='button'
                    className='book-list__btn book-list__btn_busy'
                    disabled={true}
                  >
                    занята до {time}
                  </button>
                ) : (
                  <button
                    data-test-id='booking-button'
                    type='button'
                    onClick={openModelCalendar}
                    className='book-list__btn'
                  >
                    Забронировать
                  </button>
                )}
              </div>
              <div className='book-list__elem'>
                <h4 className='book-list__elem-title'>О книге</h4>
                <p className='book-list__elem-text'>{books.description}</p>
              </div>
            </div>
            <div className='book-list__rating'>
              <h4 className='book-list__elem-title book-list__elem-title_rating '>Рейтинг</h4>
              <hr className='book-list__line' />
              {books.rating ? (
                <div className='book-list__star-wrap' data-test-id='rating'>
                  <Rating rating={books.rating} />
                  <span>{books.rating}</span>
                </div>
              ) : (
                <div className='book-list__star-flex' data-test-id='rating'>
                  <div className='book-list__star-wrap book-list__star-wrap_width'>
                    <img src={starNotPainted} alt='star-1' />
                    <img src={starNotPainted} alt='star-1' />
                    <img src={starNotPainted} alt='star-1' />
                    <img src={starNotPainted} alt='star-1' />
                    <img src={starNotPainted} alt='star-1' />
                  </div>
                  <p className='book-list__estimation'>ещё нет оценок</p>
                </div>
              )}
            </div>
            <div className='book-list__information'>
              <h4 className='book-list__elem-title book-list__elem-title_info'>Подробная информация</h4>
            </div>
            <div className='book-list__grid'>
              <div className='book-list__grid-item one'>
                <p> Издательство</p>
                <p> Год издания</p>
                <p> Страниц</p>
                <p> Переплёт</p>
                <p> Формат</p>
              </div>
              <div className='book-list__grid-elem two'>
                <p> {books.publish}</p>
                <p> {books.issueYear}</p>
                <p> {books.pages}</p>
                <p> {books.cover}</p>
                <p> {books.format}</p>
              </div>
              <div className='book-list__grid-item three'>
                <p className='hidden-more-320'> Жанр</p>
                <p> Вес</p>
                <p> ISBN</p>
                <p className='hidden-320'> Возрастные ограничения</p>
                <p> Изготовитель </p>
              </div>
              <div className='book-list__grid-elem four'>
                <p className='hidden-more-320'> {books.categories[0]}</p>
                <p> {books.weight} г</p>
                <p> {books.ISBN}</p>
                <p className='hidden-320'> 16+</p>
                <p> {books.producer}</p>
              </div>
            </div>
            {books.comments ? (
              <div className='book-list__feedback'>
                <div className='book-list__feedback-wrap'>
                  <div className='book-list__button-wrap'>
                    <h4 className='book-list__elem-title book-list__elem-title_feedback'>
                      Отзывы <span>{books.comments.length}</span>
                    </h4>
                    <button
                      data-test-id='button-hide-reviews'
                      type='button'
                      className='sidebar__store-book'
                      onClick={clickHide}
                    >
                      {onShow ? (
                        <img className='sidebar__img' src={strokeBtn} alt='unwrap' />
                      ) : (
                        <img className='sidebar__img' src={strokeArrow} alt='unwrap' />
                      )}
                    </button>
                  </div>
                  {onShow ? <hr className='book-list__line' /> : null}
                </div>
                <div data-test-id='reviews'>
                  {onShow ? sortComments.map((value) => <Comments key={value.id} {...value} />) : null}
                  <button
                    data-test-id='button-rate-book'
                    onClick={openModel}
                    type='button'
                    className='book-list__btn book-list__btn_estimation'
                    disabled={isDisabled}
                  >
                    оценить книгу
                  </button>
                </div>
              </div>
            ) : (
              <div className='book-list__feedback'>
                <div className='book-list__feedback-wrap'>
                  <h4 className='book-list__elem-title book-list__elem-title_feedback'>
                    Отзывы <span>0</span>
                  </h4>
                </div>
                <div data-test-id='reviews'>
                  <button
                    data-test-id='button-rate-book'
                    type='button'
                    onClick={openModel}
                    className='book-list__btn book-list__btn_estimation book-list__btn_margin'
                    disabled={isDisabled}
                  >
                    оценить книгу
                  </button>
                </div>
              </div>
            )}
          </div>
          {isActiveModal && <ModalReviews closeModel={closeModel} />}
          {isCalendar && <ModalCalendar bookItem={bookItem} closeModel={closeModel} />}
          {isCalendarChange && (
            <ModalCalendarChange
              bookItem={bookItem}
              closeModel={closeModel}
              idBook={id}
              bookingDate={books.booking?.dateOrder}
            />
          )}
        </div>
      )}
    </div>
  );
}

export { BookItem };
