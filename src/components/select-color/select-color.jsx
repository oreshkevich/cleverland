import React from 'react';

import './select-color.scss';

const SelectColor = (props) => {
  const { filter, str, d1 } = props;

  if (!filter) return str;
  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  if (matchValue) {
    return str.split(regexp).map((item, index, array) => {
      if (index < array.length - 1) {
        const textRed = matchValue.shift();

        return (
          <React.Fragment>
            <span key={d1 + 1}>{item}</span>
            <span key={d1} className='word-select' data-test-id='highlight-matches'>
              {textRed}
            </span>
          </React.Fragment>
        );
      }

      return item;
    });
  }

  return str;
};

export { SelectColor };
