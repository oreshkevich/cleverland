import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import buttonIconYellow from '../../assets/svg/button-2.svg';
import buttonYellow from '../../assets/svg/button-3.svg';
import buttonIcon from '../../assets/svg/button-icon.svg';
import buttonWhite from '../../assets/svg/button-white.svg';
import ratingClose from '../../assets/svg/rating.svg';
import ratingOpen from '../../assets/svg/rating-open.svg';
import searchButton from '../../assets/svg/search-button.svg';
import searchClose from '../../assets/svg/search-close.svg';
import { Cards } from '../cards';
import { CardsVertical } from '../cards-vertical';
import { Spinner } from '../spinner';

import './main.scss';

function Main(props) {
  const { categories, arrDateSort, isLoadingBook, loadingCategories } = props;

  const { name } = useParams();

  const [location, setLocation] = useState(true);
  const [ratingState, setRatingState] = useState(true);
  const [filter, setValue] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [valuePosts, setValuePosts] = useState(false);
  const [noBooks, setNoBooks] = useState(true);
  const [onFocusImg, setOnFocusImg] = useState(true);
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setLocation((prevValue) => !prevValue);
  };

  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleFocus = () => {
    setOnFocusImg(!onFocusImg);
  };

  const handleRating = () => {
    if (ratingState) {
      const ratingPos = filteredPosts.sort((a, b) => (+a.rating < +b.rating ? -1 : 1));

      setFilteredPosts(ratingPos);
    } else {
      const ratingPost = filteredPosts.sort((a, b) => (+a.rating > +b.rating ? -1 : 1));

      setFilteredPosts(ratingPost);
    }
  };

  const handleToggleRating = () => {
    setRatingState((prevValue) => !prevValue);
    handleRating();
  };

  const handleSearch = (str) => {
    const filterSearchBooks = filteredPosts.filter((item) => item.title.toLowerCase().includes(str.toLowerCase()));

    setFilteredPosts(filterSearchBooks);
    if (filterSearchBooks.length === 0) {
      setNoBooks(false);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (filter) {
      handleSearch(filter);
    }
    if (e.target.value.trim() === '') {
      setFilteredPosts(arrDateSort);
      setNoBooks(true);
    }
  };

  useEffect(() => {
    if (arrDateSort.length && !valuePosts) {
      setFilteredPosts(arrDateSort);
      setValuePosts(true);
    }
  }, [arrDateSort, valuePosts]);

  useEffect(() => {
    if (arrDateSort.length && name) {
      const categotiesArr = categories.map((item) => ({ [item.path]: item.name }));

      setFilteredPosts(
        arrDateSort.filter((item) =>
          name && name !== 'all' ? item.categories[0] === categotiesArr.filter((elem) => elem[name])[0][name] : item
        )
      );
    }
  }, [name, arrDateSort, categories]);

  return (
    <div className='main-wrap'>
      <div className='main-card'>
        <div className='search'>
          <button
            data-test-id='button-search-open'
            type='button'
            className={`search__button ${isActive ? 'hidden' : ''}`}
            onClick={handleToggle}
          >
            <img src={searchButton} alt='icon_action' />
          </button>
          <input
            data-test-id='input-search'
            className={`input ${isActive ? 'input-hidden' : ''}  ${onFocusImg ? 'input-grey' : 'input-yellow'}`}
            type='search'
            placeholder='Поиск книги или автора…'
            id='search-field'
            onChange={(e) => handleChange(e)}
            value={filter}
            onFocus={handleFocus}
            onBlur={handleFocus}
          />
          <button
            data-test-id='button-search-close'
            type='button'
            className={`search__button-close ${isActive ? '' : 'hidden'}`}
            onClick={handleToggle}
          >
            <img src={searchClose} alt='icon_action' />
          </button>
          <button
            data-test-id='sort-rating-button'
            type='button'
            onClick={handleToggleRating}
            className={`filter-more__btn ${isActive ? 'hidden' : ''}`}
          >
            <img src={ratingState ? ratingClose : ratingOpen} alt='icon_action' />
            <span className='filter-more__title'>По рейтингу</span>
          </button>
        </div>
        <div className='btn-wrap'>
          <button
            type='button'
            data-test-id='button-menu-view-window'
            className={` ${isActive ? 'hidden' : ''}`}
            onClick={handleClick}
          >
            <img src={location ? buttonIcon : buttonIconYellow} alt='icon_action' />
          </button>
          <button
            type='button'
            data-test-id='button-menu-view-list'
            className={` ${isActive ? 'hidden' : ''}`}
            onClick={handleClick}
          >
            <img src={location ? buttonWhite : buttonYellow} alt='icon_action' />
          </button>
        </div>
      </div>

      {location ? (
        <div className='card__wrap' data-test-id='content'>
          {isLoadingBook && loadingCategories ? (
            <Spinner />
          ) : (
            <Cards cards={filteredPosts} noBooks={noBooks} filter={filter} />
          )}
        </div>
      ) : (
        <div className='card__wrap-vertical'>
          {isLoadingBook && loadingCategories ? <Spinner /> : <CardsVertical cards={filteredPosts} filter={filter} />}
        </div>
      )}
    </div>
  );
}
export { Main };
