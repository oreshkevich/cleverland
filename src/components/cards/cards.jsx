import React from 'react';

import { Card } from '../card';

import './cards.scss';

function Cards(props) {
  const { cards = [], filter, noBooks } = props;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <React.Fragment>
      {cards.length ? (
        cards.map((value) => <Card key={value.id} {...value} filter={filter} />)
      ) : noBooks ? (
        <h2 data-test-id='empty-category' className='category-name'>
          В этой категории книг ещё нет
        </h2>
      ) : (
        <h2 data-test-id='search-result-not-found' className='category-name'>
          По запросу ничего не найдено
        </h2>
      )}
    </React.Fragment>
  );
}

export { Cards };
