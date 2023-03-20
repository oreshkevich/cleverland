import React from 'react';

import { RegExp } from '../utils/reg-exp';

function ErrorLogin({ str }) {
  if (str) {
    if (str.search(RegExp.loginLatin) !== -1 && str.search(RegExp.loginNumber) === -1) {
      return (
        // eslint-disable-next-line react/jsx-filename-extension
        <React.Fragment>
          Используйте для логина <span>латинский алфавит</span> и <span className='small-errors'>цифры</span>
        </React.Fragment>
      );
    }
    if (
      (str.search(RegExp.loginNumber) !== -1 && str.search(RegExp.loginLatin) === -1) ||
      (str.search(RegExp.loginRussian) !== -1 && str.search(RegExp.loginNumber) !== -1)
    ) {
      return (
        <React.Fragment>
          Используйте для логина <span className='small-errors'>латинский алфавит</span> и <span>цифры</span>
        </React.Fragment>
      );
    }
    if (
      (str.search(RegExp.loginRussian) !== -1 && str.search(RegExp.loginNumber) === -1) ||
      str.search(RegExp.exceptForTheSpace) !== -1
    ) {
      return (
        <React.Fragment>
          Используйте для логина <span className='small-errors'>латинский алфавит</span> и{' '}
          <span className='small-errors'>цифры</span>
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      Используйте для логина <span>латинский алфавит</span> и <span>цифры</span>{' '}
    </React.Fragment>
  );
}

export { ErrorLogin };
